import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  IconButton,
  Chip,
  Select,
  MenuItem,
  FormControl,
  Tooltip,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  HelpOutline as HelpOutlineIcon,
  Add as AddIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const ACTIVE_BLUE = '#3B82F6';
const INACTIVE_COLOR = '#475569';

interface Contract {
  id: string;
  description: string;
  professionalShare: number;
  usedAllYear: boolean;
  entryType: 'monthly' | 'total';
  monthlyAmount: number;
  totalAmount: number;
}

const PhoneInternetCosts: React.FC = () => {
  const [entryMethod, setEntryMethod] = useState<'detailed' | 'total'>('detailed');
  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: '1',
      description: '',
      professionalShare: 20,
      usedAllYear: true,
      entryType: 'monthly',
      monthlyAmount: 0,
      totalAmount: 0,
    },
  ]);

  const handleAddContract = () => {
    setContracts([
      ...contracts,
      {
        id: Date.now().toString(),
        description: '',
        professionalShare: 20,
        usedAllYear: true,
        entryType: 'monthly',
        monthlyAmount: 0,
        totalAmount: 0,
      },
    ]);
  };

  const handleRemoveContract = (id: string) => {
    if (contracts.length > 1) {
      setContracts(contracts.filter((c) => c.id !== id));
    }
  };

  const handleContractChange = (id: string, field: keyof Contract, value: any) => {
    setContracts(
      contracts.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
          Handy- & Internetkosten
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
        Sie können den Anteil Ihrer Handy- & Internetkosten steuerlich absetzen, der auf berufliche Nutzung entfällt. Das Finanza{' '}
        <Typography
          component="span"
          sx={{ color: ACTIVE_BLUE, textDecoration: 'underline', cursor: 'pointer' }}
        >
          ...mehr
        </Typography>
      </Typography>

      {/* Form Card */}
      <Box sx={{ bgcolor: '#FFFFFF', borderRadius: 2, p: 3, border: '1px solid #E2E8F0' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E293B', mb: 3 }}>
          Handy- & Internetkosten
        </Typography>

        {/* Entry Method */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B', mb: 2 }}>
            Wie möchten Sie die Daten erfassen?
          </Typography>
          <RadioGroup
            row
            value={entryMethod}
            onChange={(e) => setEntryMethod(e.target.value as 'detailed' | 'total')}
          >
            <FormControlLabel
              value="detailed"
              control={<Radio sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }} />}
              label="Detaillierte Eingabe"
            />
            <FormControlLabel
              value="total"
              control={<Radio sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }} />}
              label="Gesamtbetrag"
            />
          </RadioGroup>
        </Box>

        {entryMethod === 'detailed' && (
          <>
            {contracts.map((contract, index) => (
              <Box key={contract.id} sx={{ mb: 4, p: 2, bgcolor: '#F7F8F9', borderRadius: 2 }}>
                {/* Contract Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Chip
                    label={`${index + 1}. Handy- / Internetvertrag`}
                    sx={{
                      bgcolor: ACTIVE_BLUE,
                      color: '#FFFFFF',
                      fontWeight: 500,
                    }}
                  />
                  {contracts.length > 1 && (
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveContract(contract.id)}
                      sx={{ color: INACTIVE_COLOR }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>

                {/* Description */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: '#1E293B', mb: 1 }}>
                    Bezeichnung (optional)
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={contract.description}
                    onChange={(e) => handleContractChange(contract.id, 'description', e.target.value)}
                    placeholder="z.B. Handy-Vertrag Telekom"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: '#FFFFFF',
                        borderRadius: '8px',
                      },
                    }}
                  />
                </Box>

                {/* Professional Share */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                      Wie hoch war der berufliche Anteil an den Kosten?
                    </Typography>
                    <Tooltip
                      title="Geben Sie den prozentualen Anteil an, den Sie beruflich nutzen. Üblich sind 20-30% bei gemischter Nutzung."
                      arrow
                    >
                      <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                        <HelpOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextField
                      type="number"
                      size="small"
                      value={contract.professionalShare}
                      onChange={(e) => handleContractChange(contract.id, 'professionalShare', parseFloat(e.target.value) || 0)}
                      sx={{
                        width: 100,
                        '& .MuiOutlinedInput-root': {
                          bgcolor: '#FFFFFF',
                          borderRadius: '8px',
                        },
                      }}
                    />
                    <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                      %
                    </Typography>
                  </Box>
                </Box>

                {/* Used All Year */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                      Erfolgte die Nutzung das gesamte Jahr?
                    </Typography>
                    <Tooltip
                      title="Wenn Sie den Vertrag nicht das ganze Jahr genutzt haben, können Sie die Nutzungsdauer angeben."
                      arrow
                    >
                      <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                        <HelpOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <RadioGroup
                    row
                    value={contract.usedAllYear ? 'yes' : 'no'}
                    onChange={(e) => handleContractChange(contract.id, 'usedAllYear', e.target.value === 'yes')}
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

                {/* Entry Type */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B', mb: 1 }}>
                    Wie möchten Sie die Daten erfassen?
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      value={contract.entryType}
                      onChange={(e) => handleContractChange(contract.id, 'entryType', e.target.value)}
                      sx={{
                        bgcolor: '#FFFFFF',
                        borderRadius: '8px',
                      }}
                    >
                      <MenuItem value="monthly">Gleichbleibender Monatsbetrag</MenuItem>
                      <MenuItem value="total">Gesamtbetrag</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Amount Input */}
                {contract.entryType === 'monthly' ? (
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                        Rechnungsbetrag pro Monat
                      </Typography>
                      <Tooltip
                        title="Geben Sie den monatlichen Rechnungsbetrag an."
                        arrow
                      >
                        <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                          <HelpOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TextField
                        type="number"
                        size="small"
                        value={contract.monthlyAmount}
                        onChange={(e) => handleContractChange(contract.id, 'monthlyAmount', parseFloat(e.target.value) || 0)}
                        placeholder="0,00"
                        sx={{
                          width: 200,
                          '& .MuiOutlinedInput-root': {
                            bgcolor: '#FFFFFF',
                            borderRadius: '8px',
                          },
                        }}
                      />
                      <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                        €
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                        Gesamtbetrag
                      </Typography>
                      <Tooltip
                        title="Geben Sie den Gesamtbetrag für das Jahr an."
                        arrow
                      >
                        <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                          <HelpOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TextField
                        type="number"
                        size="small"
                        value={contract.totalAmount}
                        onChange={(e) => handleContractChange(contract.id, 'totalAmount', parseFloat(e.target.value) || 0)}
                        placeholder="0,00"
                        sx={{
                          width: 200,
                          '& .MuiOutlinedInput-root': {
                            bgcolor: '#FFFFFF',
                            borderRadius: '8px',
                          },
                        }}
                      />
                      <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                        €
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            ))}

            {/* Add Contract Button */}
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAddContract}
              sx={{
                borderColor: ACTIVE_BLUE,
                color: ACTIVE_BLUE,
                textTransform: 'none',
                mb: 3,
                '&:hover': {
                  borderColor: '#2563EB',
                  bgcolor: '#EFF6FF',
                },
              }}
            >
              weiteren Vertrag hinzufügen
            </Button>
          </>
        )}

        {entryMethod === 'total' && (
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B', mb: 1 }}>
              Gesamtbetrag für Handy- & Internetkosten
            </Typography>
            <TextField
              type="number"
              size="small"
              placeholder="0,00"
              sx={{
                width: 200,
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#FFFFFF',
                  borderRadius: '8px',
                },
              }}
              InputProps={{
                endAdornment: <Typography sx={{ color: INACTIVE_COLOR, mr: 1 }}>€</Typography>,
              }}
            />
          </Box>
        )}

        {/* Confirm Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
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
    </Box>
  );
};

export default PhoneInternetCosts;

