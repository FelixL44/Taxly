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
  InputLabel,
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
} from '@mui/icons-material';

const BRAND_GREEN = '#32CE69';
const ACTIVE_BLUE = '#3B82F6';
const INACTIVE_COLOR = '#475569';

interface Donation {
  id: string;
  type: string;
  country: 'germany' | 'eu';
  recipient: string;
  quantity: number;
  amount: number;
}

const DonationsPartyContributions: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [donations, setDonations] = useState<Donation[]>([
    {
      id: '1',
      type: 'non-profit',
      country: 'germany',
      recipient: '',
      quantity: 1,
      amount: 0,
    },
  ]);
  const [expandedDonation, setExpandedDonation] = useState<string>('1');

  const handleAddDonation = () => {
    const newId = Date.now().toString();
    setDonations([
      ...donations,
      {
        id: newId,
        type: 'non-profit',
        country: 'germany',
        recipient: '',
        quantity: 1,
        amount: 0,
      },
    ]);
    setExpandedDonation(newId);
  };

  const handleRemoveDonation = (id: string) => {
    if (donations.length > 1) {
      setDonations(donations.filter((d) => d.id !== id));
      if (expandedDonation === id) {
        setExpandedDonation(donations[0].id);
      }
    }
  };

  const handleDonationChange = (id: string, field: keyof Donation, value: any) => {
    setDonations(donations.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
          Spenden & Parteibeiträge
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
        Zu Spenden & Parteibeiträgen zählen freiwillige Zuwendungen an begünstigte Empfänger.{' '}
        <Typography
          component="span"
          sx={{ color: ACTIVE_BLUE, textDecoration: 'underline', cursor: 'pointer' }}
        >
          ...mehr
        </Typography>
      </Typography>

      {/* Form Card */}
      <Box sx={{ bgcolor: '#F7F8F9', borderRadius: 2, p: 3, border: '1px solid #E2E8F0' }}>
        <Accordion
          expanded={expandedDonation === '1'}
          onChange={() => setExpandedDonation(expandedDonation === '1' ? '' : '1')}
          sx={{
            boxShadow: 'none',
            bgcolor: 'transparent',
            '&:before': { display: 'none' },
            '&.Mui-expanded': { margin: 0 },
          }}
        >
          <AccordionSummary
            expandIcon={
              expandedDonation === '1' ? (
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
              Spenden in 2025
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0, pb: 0, pt: 2 }}>
            {donations.map((donation, index) => (
              <Box key={donation.id} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      color: ACTIVE_BLUE,
                      textDecoration: 'underline',
                    }}
                  >
                    {index + 1}. Eintrag
                  </Typography>
                  {donations.length > 1 && (
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveDonation(donation.id)}
                      sx={{ color: INACTIVE_COLOR }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>

                {/* Art der Spende */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                      Art der Spende
                    </Typography>
                    <Tooltip
                      title="Wählen Sie die Art der Spende aus (z.B. gemeinnützige Organisation, Partei, etc.)."
                      arrow
                    >
                      <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                        <HelpOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <FormControl fullWidth size="small">
                    <Select
                      value={donation.type}
                      onChange={(e) => handleDonationChange(donation.id, 'type', e.target.value)}
                      sx={{
                        bgcolor: '#FFFFFF',
                        borderRadius: '8px',
                      }}
                    >
                      <MenuItem value="non-profit">Gemeinnützige Organisation</MenuItem>
                      <MenuItem value="party">Partei</MenuItem>
                      <MenuItem value="church">Kirche</MenuItem>
                      <MenuItem value="other">Sonstige</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Land der gemeinnützigen Organisation */}
                {donation.type === 'non-profit' && (
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                        Land der gemeinnützigen Organisation
                      </Typography>
                      <Tooltip
                        title="Geben Sie an, ob die Organisation in Deutschland oder im EU-/EWR-Ausland ansässig ist."
                        arrow
                      >
                        <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                          <HelpOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <RadioGroup
                      row
                      value={donation.country}
                      onChange={(e) => handleDonationChange(donation.id, 'country', e.target.value)}
                    >
                      <FormControlLabel
                        value="germany"
                        control={<Radio sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }} />}
                        label="Deutschland"
                      />
                      <FormControlLabel
                        value="eu"
                        control={<Radio sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }} />}
                        label="EU- / EWR-Ausland"
                      />
                    </RadioGroup>
                  </Box>
                )}

                {/* Empfänger */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                      Empfänger
                    </Typography>
                    <Tooltip
                      title="Geben Sie den Namen des Empfängers der Spende an."
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
                    value={donation.recipient}
                    onChange={(e) => handleDonationChange(donation.id, 'recipient', e.target.value)}
                    placeholder="z.B. Name der Organisation"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: '#FFFFFF',
                        borderRadius: '8px',
                      },
                    }}
                  />
                </Box>

                {/* Anzahl */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B', mb: 1 }}>
                    Anzahl
                  </Typography>
                  <TextField
                    type="number"
                    size="small"
                    value={donation.quantity}
                    onChange={(e) => handleDonationChange(donation.id, 'quantity', parseInt(e.target.value) || 1)}
                    sx={{
                      width: 100,
                      '& .MuiOutlinedInput-root': {
                        bgcolor: '#FFFFFF',
                        borderRadius: '8px',
                      },
                    }}
                  />
                </Box>

                {/* Betrag */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                      Betrag
                    </Typography>
                    <Tooltip
                      title="Geben Sie den Betrag der Spende an."
                      arrow
                    >
                      <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                        <HelpOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <TextField
                    type="number"
                    size="small"
                    value={donation.amount}
                    onChange={(e) => handleDonationChange(donation.id, 'amount', parseFloat(e.target.value) || 0)}
                    placeholder="0,00"
                    InputProps={{
                      endAdornment: <Typography sx={{ color: INACTIVE_COLOR, mr: 1 }}>€</Typography>,
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

                {/* Add Another Entry Link */}
                {index === donations.length - 1 && (
                  <Typography
                    component="button"
                    onClick={handleAddDonation}
                    sx={{
                      color: ACTIVE_BLUE,
                      textDecoration: 'underline',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      fontSize: '14px',
                      mb: 2,
                    }}
                  >
                    + weiterer Eintrag
                  </Typography>
                )}
              </Box>
            ))}

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
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default DonationsPartyContributions;

