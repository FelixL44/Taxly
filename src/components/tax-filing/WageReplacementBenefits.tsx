import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Divider,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  HelpOutline as HelpOutlineIcon,
  Add as AddIcon,
  ExpandLess as ExpandLessIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';

const ACTIVE_BLUE = '#3B82F6';
const INACTIVE_COLOR = '#475569';

interface Benefit {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  fromGermany: boolean;
}

const WageReplacementBenefits: React.FC = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([
    {
      id: '1',
      type: '',
      startDate: '',
      endDate: '',
      fromGermany: true,
    },
  ]);
  const [expandedBenefit, setExpandedBenefit] = useState<string>('1');
  const [selectedYear, setSelectedYear] = useState<string>('');

  const handleAddBenefit = () => {
    const newId = Date.now().toString();
    setBenefits([
      ...benefits,
      {
        id: newId,
        type: '',
        startDate: '',
        endDate: '',
        fromGermany: true,
      },
    ]);
    setExpandedBenefit(newId);
  };

  const handleBenefitChange = (id: string, field: keyof Benefit, value: any) => {
    setBenefits(benefits.map((b) => (b.id === id ? { ...b, [field]: value } : b)));
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
          Lohnersatzleistungen
        </Typography>
        <IconButton
          onClick={() => {
            // Handle delete
          }}
          sx={{ color: INACTIVE_COLOR }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>

      {/* Info Text */}
      <Typography variant="body2" sx={{ color: INACTIVE_COLOR, mb: 4, lineHeight: 1.6 }}>
        Lohnersatzleistungen sind Zahlungen, die Arbeitnehmer erhalten, um einen Verdienstausfall abzufedern.{' '}
        <Typography
          component="span"
          sx={{ color: ACTIVE_BLUE, textDecoration: 'underline', cursor: 'pointer' }}
        >
          ...mehr
        </Typography>
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {benefits.map((benefit, index) => (
        <Box key={benefit.id} sx={{ mb: 3 }}>
          {/* Tab Navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: ACTIVE_BLUE,
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              {index + 1}. Lohnersatzleistung
            </Typography>
            <IconButton
              size="small"
              onClick={handleAddBenefit}
              sx={{
                bgcolor: ACTIVE_BLUE,
                color: '#FFFFFF',
                width: 32,
                height: 32,
                '&:hover': { bgcolor: '#2563EB' },
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Form Card */}
          <Paper
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: 2,
              border: '1px solid #E2E8F0',
              overflow: 'hidden',
            }}
          >
            <Accordion
              expanded={expandedBenefit === benefit.id}
              onChange={() => setExpandedBenefit(expandedBenefit === benefit.id ? '' : benefit.id)}
              sx={{
                boxShadow: 'none',
                '&:before': { display: 'none' },
                '&.Mui-expanded': { margin: 0 },
              }}
            >
              <AccordionSummary
                expandIcon={
                  expandedBenefit === benefit.id ? (
                    <ExpandLessIcon sx={{ color: INACTIVE_COLOR }} />
                  ) : null
                }
                sx={{
                  px: 3,
                  py: 2,
                  '&.Mui-expanded': { minHeight: 56 },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E293B' }}>
                  Lohnersatzleistung
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
                <Box sx={{ mt: 2 }}>
                  {/* Art der Ersatzleistung */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                        Art der Ersatzleistung
                      </Typography>
                      <Tooltip
                        title="Wählen Sie die Art der Lohnersatzleistung aus (z.B. Krankengeld, Elterngeld, Arbeitslosengeld)."
                        arrow
                      >
                        <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                          <HelpOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <FormControl fullWidth size="small">
                      <Select
                        value={benefit.type}
                        onChange={(e) => handleBenefitChange(benefit.id, 'type', e.target.value)}
                        displayEmpty
                        sx={{
                          bgcolor: '#FFFFFF',
                          borderRadius: '8px',
                        }}
                      >
                        <MenuItem value="" disabled>
                          Bitte wählen
                        </MenuItem>
                        <MenuItem value="krankengeld">Krankengeld</MenuItem>
                        <MenuItem value="elterngeld">Elterngeld</MenuItem>
                        <MenuItem value="arbeitslosengeld">Arbeitslosengeld</MenuItem>
                        <MenuItem value="kurzarbeitergeld">Kurzarbeitergeld</MenuItem>
                        <MenuItem value="insolvenzgeld">Insolvenzgeld</MenuItem>
                        <MenuItem value="sonstige">Sonstige</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {/* Beginn Leistungszeitraum */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                        Beginn Leistungszeitraum
                      </Typography>
                      <Tooltip
                        title="Geben Sie das Datum an, an dem die Leistung begonnen hat."
                        arrow
                      >
                        <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                          <HelpOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <TextField
                      type="date"
                      size="small"
                      value={benefit.startDate}
                      onChange={(e) => handleBenefitChange(benefit.id, 'startDate', e.target.value)}
                      placeholder="TT.MM.JJJJ"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        endAdornment: <CalendarIcon sx={{ color: INACTIVE_COLOR, fontSize: 20, mr: 1 }} />,
                      }}
                      sx={{
                        width: 200,
                        '& .MuiOutlinedInput-root': {
                          bgcolor: '#FFFFFF',
                          borderRadius: '8px',
                        },
                      }}
                    />
                  </Box>

                  {/* Ende Leistungszeitraum */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                        Ende Leistungszeitraum
                      </Typography>
                      <Tooltip
                        title="Geben Sie das Datum an, an dem die Leistung geendet hat."
                        arrow
                      >
                        <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                          <HelpOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <TextField
                      type="date"
                      size="small"
                      value={benefit.endDate}
                      onChange={(e) => handleBenefitChange(benefit.id, 'endDate', e.target.value)}
                      placeholder="TT.MM.JJJJ"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        endAdornment: <CalendarIcon sx={{ color: INACTIVE_COLOR, fontSize: 20, mr: 1 }} />,
                      }}
                      sx={{
                        width: 200,
                        '& .MuiOutlinedInput-root': {
                          bgcolor: '#FFFFFF',
                          borderRadius: '8px',
                        },
                      }}
                    />
                  </Box>

                  {/* Stammt die Leistung aus Deutschland? */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                        Stammt die Leistung aus Deutschland?
                      </Typography>
                      <Tooltip
                        title="Geben Sie an, ob die Leistung aus Deutschland stammt oder aus dem Ausland."
                        arrow
                      >
                        <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                          <HelpOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <RadioGroup
                      row
                      value={benefit.fromGermany ? 'yes' : 'no'}
                      onChange={(e) => handleBenefitChange(benefit.id, 'fromGermany', e.target.value === 'yes')}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }} />}
                        label="Ja"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }} />}
                        label="Nein"
                      />
                    </RadioGroup>
                  </Box>

                  {/* Confirm Button */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: ACTIVE_BLUE,
                        color: '#FFFFFF',
                        textTransform: 'none',
                        px: 4,
                        '&:hover': { bgcolor: '#2563EB' },
                      }}
                    >
                      bestätigen
                    </Button>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Box>
      ))}

      {/* Summary Section */}
      <Paper
        sx={{
          bgcolor: '#F7F8F9',
          borderRadius: 2,
          p: 2,
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
          Erhaltene Leistungen in 2025
        </Typography>
        <Radio
          checked={selectedYear === '2025'}
          onChange={(e) => setSelectedYear(e.target.checked ? '2025' : '')}
          sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }}
        />
      </Paper>

      {/* Add Another Benefit Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddBenefit}
          sx={{
            borderColor: ACTIVE_BLUE,
            color: ACTIVE_BLUE,
            textTransform: 'none',
            px: 3,
            py: 1.5,
            '&:hover': {
              borderColor: '#2563EB',
              bgcolor: '#EFF6FF',
            },
          }}
        >
          weitere Ersatzleistung hinzufügen
        </Button>
      </Box>
    </Box>
  );
};

export default WageReplacementBenefits;

