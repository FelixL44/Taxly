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
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  HelpOutline as HelpOutlineIcon,
  Add as AddIcon,
  Close as CloseIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';

const BRAND_GREEN = '#32CE69';
const ACTIVE_BLUE = '#3B82F6';
const INACTIVE_COLOR = '#475569';

interface Education {
  id: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  atHome: boolean;
  fullTime: boolean;
}

const FirstEducation: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [educations, setEducations] = useState<Education[]>([
    {
      id: '1',
      description: '',
      startDate: '',
      endDate: '',
      location: '',
      atHome: false,
      fullTime: true,
    },
  ]);
  const [expandedEducation, setExpandedEducation] = useState<string>('1');

  const handleAddEducation = () => {
    const newId = Date.now().toString();
    setEducations([
      ...educations,
      {
        id: newId,
        description: '',
        startDate: '',
        endDate: '',
        location: '',
        atHome: false,
        fullTime: true,
      },
    ]);
    setExpandedEducation(newId);
  };

  const handleRemoveEducation = (id: string) => {
    if (educations.length > 1) {
      setEducations(educations.filter((e) => e.id !== id));
      if (expandedEducation === id) {
        setExpandedEducation(educations[0].id);
      }
    }
  };

  const handleEducationChange = (id: string, field: keyof Education, value: any) => {
    setEducations(educations.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
          Erstausbildung ohne Arbeitsverhältnis
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
        Ausbildungskosten umfassen alle Kosten, die während einer Erstausbildung ohne Arbeitsverhältnis anfallen{' '}
        <Typography
          component="span"
          sx={{ color: ACTIVE_BLUE, textDecoration: 'underline', cursor: 'pointer' }}
        >
          ...mehr
        </Typography>
      </Typography>

      {/* Add Education Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <IconButton
          onClick={handleAddEducation}
          sx={{
            bgcolor: ACTIVE_BLUE,
            color: '#FFFFFF',
            '&:hover': { bgcolor: '#2563EB' },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {educations.map((education, index) => (
        <Box key={education.id} sx={{ mb: 3 }}>
          {/* Tab Navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: ACTIVE_BLUE,
                textDecoration: 'underline',
              }}
            >
              {index + 1}. Erstausbildung
            </Typography>
            {educations.length > 1 && (
              <IconButton
                size="small"
                onClick={() => handleRemoveEducation(education.id)}
                sx={{ color: INACTIVE_COLOR }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Box>

          {/* Form Card */}
          <Box sx={{ bgcolor: '#FFFFFF', borderRadius: 2, p: 3, border: '1px solid #E2E8F0' }}>
            <Accordion
              expanded={expandedEducation === education.id}
              onChange={() => setExpandedEducation(expandedEducation === education.id ? '' : education.id)}
              sx={{
                boxShadow: 'none',
                '&:before': { display: 'none' },
                '&.Mui-expanded': { margin: 0 },
              }}
            >
              <AccordionSummary
                expandIcon={
                  expandedEducation === education.id ? (
                    <ExpandLessIcon sx={{ color: INACTIVE_COLOR }} />
                  ) : (
                    <ExpandMoreIcon sx={{ color: INACTIVE_COLOR }} />
                  )
                }
                sx={{
                  px: 0,
                  py: 0,
                  '&.Mui-expanded': { minHeight: 56 },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E293B' }}>
                  Allgemeine Angaben
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0, pb: 0, pt: 2 }}>
                <Box>
                  {/* Bezeichnung der Erstausbildung */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                        Bezeichnung der Erstausbildung
                      </Typography>
                      <Tooltip
                        title="Geben Sie eine kurze Bezeichnung für Ihre Erstausbildung an (z.B. Bachelorstudium, Ausbildung)."
                        arrow
                      >
                        <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                          <HelpOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <TextField
                      fullWidth
                      size="small"
                      value={education.description}
                      onChange={(e) => handleEducationChange(education.id, 'description', e.target.value)}
                      placeholder="z.B. Bachelorstudium"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: '#FFFFFF',
                          borderRadius: '8px',
                        },
                      }}
                    />
                  </Box>

                  {/* Dauer der Erstausbildung */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                        Dauer der Erstausbildung
                      </Typography>
                      <Tooltip
                        title="Geben Sie den Zeitraum der Erstausbildung an."
                        arrow
                      >
                        <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                          <HelpOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TextField
                        type="date"
                        size="small"
                        value={education.startDate}
                        onChange={(e) => handleEducationChange(education.id, 'startDate', e.target.value)}
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
                      <Typography sx={{ color: INACTIVE_COLOR }}>-</Typography>
                      <TextField
                        type="date"
                        size="small"
                        value={education.endDate}
                        onChange={(e) => handleEducationChange(education.id, 'endDate', e.target.value)}
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
                  </Box>

                  {/* Ort der Erstausbildung */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                        Ort der Erstausbildung
                      </Typography>
                      <Tooltip
                        title="Geben Sie den Ort an, an dem die Erstausbildung stattgefunden hat."
                        arrow
                      >
                        <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                          <HelpOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <TextField
                      fullWidth
                      size="small"
                      value={education.location}
                      onChange={(e) => handleEducationChange(education.id, 'location', e.target.value)}
                      placeholder="z.B. Berlin"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: '#FFFFFF',
                          borderRadius: '8px',
                        },
                      }}
                    />
                  </Box>

                  {/* Fand die Erstausbildung überwiegend in Ihrem Haushalt statt? */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                        Fand die Erstausbildung überwiegend in Ihrem Haushalt statt (z. B. Fernstudium)?
                      </Typography>
                      <Tooltip
                        title="Geben Sie an, ob die Erstausbildung hauptsächlich zu Hause stattgefunden hat (z.B. Fernstudium)."
                        arrow
                      >
                        <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                          <HelpOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <RadioGroup
                      row
                      value={education.atHome ? 'yes' : 'no'}
                      onChange={(e) => handleEducationChange(education.id, 'atHome', e.target.value === 'yes')}
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

                  {/* Fand die Erstausbildung in Vollzeit statt? */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                        Fand die Erstausbildung in Vollzeit statt?
                      </Typography>
                      <Tooltip
                        title="Geben Sie an, ob die Erstausbildung in Vollzeit oder Teilzeit absolviert wurde."
                        arrow
                      >
                        <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                          <HelpOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <RadioGroup
                      row
                      value={education.fullTime ? 'yes' : 'no'}
                      onChange={(e) => handleEducationChange(education.id, 'fullTime', e.target.value === 'yes')}
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
          </Box>
        </Box>
      ))}

      {/* Add Another Education Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddEducation}
          sx={{
            borderColor: ACTIVE_BLUE,
            color: ACTIVE_BLUE,
            textTransform: 'none',
            px: 3,
            '&:hover': {
              borderColor: '#2563EB',
              bgcolor: '#EFF6FF',
            },
          }}
        >
          weitere Erstausbildung hinzufügen
        </Button>
      </Box>
    </Box>
  );
};

export default FirstEducation;

