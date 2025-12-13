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
  Tooltip,
  Autocomplete,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  HelpOutline as HelpOutlineIcon,
  Add as AddIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const ACTIVE_BLUE = '#3B82F6';
const INACTIVE_COLOR = '#475569';

interface WorkEquipment {
  id: string;
  description: string;
  knowsDeductibleAmount: boolean;
  purchaseDate: string;
  purchaseCosts: number;
}

const equipmentTypes = [
  'Computer / Laptop',
  'Büromöbel',
  'Fachliteratur',
  'Software',
  'Drucker / Scanner',
  'Sonstiges',
];

const WorkEquipment: React.FC = () => {
  const [entryMethod, setEntryMethod] = useState<'detailed' | 'total'>('detailed');
  const [equipment, setEquipment] = useState<WorkEquipment[]>([
    {
      id: '1',
      description: '',
      knowsDeductibleAmount: false,
      purchaseDate: '',
      purchaseCosts: 0,
    },
  ]);

  const handleAddEquipment = () => {
    setEquipment([
      ...equipment,
      {
        id: Date.now().toString(),
        description: '',
        knowsDeductibleAmount: false,
        purchaseDate: '',
        purchaseCosts: 0,
      },
    ]);
  };

  const handleRemoveEquipment = (id: string) => {
    if (equipment.length > 1) {
      setEquipment(equipment.filter((e) => e.id !== id));
    }
  };

  const handleEquipmentChange = (id: string, field: keyof WorkEquipment, value: any) => {
    setEquipment(
      equipment.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
          Arbeitsmittel
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
        Zu Arbeitsmitteln zählen alle beruflich genutzten Gegenstände. Zum Beispiel: Computer, Büromöbel, Fachliteratur{' '}
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
          Arbeitsmittel
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
            {equipment.map((item, index) => (
              <Box key={item.id} sx={{ mb: 4, p: 2, bgcolor: '#F7F8F9', borderRadius: 2 }}>
                {/* Equipment Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Chip
                    label={`${index + 1}. Arbeitsmittel`}
                    sx={{
                      bgcolor: ACTIVE_BLUE,
                      color: '#FFFFFF',
                      fontWeight: 500,
                    }}
                  />
                  {equipment.length > 1 && (
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveEquipment(item.id)}
                      sx={{ color: INACTIVE_COLOR }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>

                {/* Description */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: '#1E293B', mb: 1 }}>
                    Bezeichnung
                  </Typography>
                  <Autocomplete
                    freeSolo
                    options={equipmentTypes}
                    value={item.description}
                    onChange={(_, newValue) => handleEquipmentChange(item.id, 'description', newValue || '')}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder="z.B. Laptop"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            bgcolor: '#FFFFFF',
                            borderRadius: '8px',
                          },
                        }}
                      />
                    )}
                  />
                </Box>

                {/* Knows Deductible Amount */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                      Kennen Sie den absetzbaren Betrag für 2025?
                    </Typography>
                    <Tooltip
                      title="Bei Anschaffungskosten über 800 € muss über mehrere Jahre abgeschrieben werden. Bei Kosten unter 800 € können Sie den vollen Betrag im Jahr der Anschaffung absetzen."
                      arrow
                    >
                      <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                        <HelpOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <RadioGroup
                    value={item.knowsDeductibleAmount ? 'yes' : 'no'}
                    onChange={(e) => handleEquipmentChange(item.id, 'knowsDeductibleAmount', e.target.value === 'yes')}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }} />}
                      label="Ja, ich kenne den absetzbaren Betrag"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }} />}
                      label="Nein, ich brauche Unterstützung"
                    />
                  </RadioGroup>
                </Box>

                {/* Purchase Date */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: '#1E293B', mb: 1 }}>
                    Anschaffungsdatum
                  </Typography>
                  <TextField
                    type="date"
                    size="small"
                    value={item.purchaseDate}
                    onChange={(e) => handleEquipmentChange(item.id, 'purchaseDate', e.target.value)}
                    placeholder="TT.MM.JJJJ"
                    InputLabelProps={{
                      shrink: true,
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

                {/* Purchase Costs */}
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                      Anschaffungskosten
                    </Typography>
                    <Tooltip
                      title="Geben Sie die Anschaffungskosten des Arbeitsmittels an. Bei Kosten über 800 € erfolgt eine Abschreibung über mehrere Jahre."
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
                      value={item.purchaseCosts}
                      onChange={(e) => handleEquipmentChange(item.id, 'purchaseCosts', parseFloat(e.target.value) || 0)}
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
              </Box>
            ))}

            {/* Add Equipment Button */}
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAddEquipment}
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
              weiteres Arbeitsmittel hinzufügen
            </Button>
          </>
        )}

        {entryMethod === 'total' && (
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B', mb: 1 }}>
              Gesamtbetrag für Arbeitsmittel
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

export default WorkEquipment;

