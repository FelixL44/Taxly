import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
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
} from '@mui/material';
import {
  Delete as DeleteIcon,
  HelpOutline as HelpOutlineIcon,
  Add as AddIcon,
  Close as CloseIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

const ACTIVE_BLUE = '#3B82F6';
const INACTIVE_COLOR = '#475569';

interface Property {
  id: string;
  type: 'property' | 'land';
  propertyType: string;
}

const RentalLeasing: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      type: 'property',
      propertyType: '',
    },
  ]);
  const [expandedProperty, setExpandedProperty] = useState<string>('1');

  const handleAddProperty = () => {
    const newId = Date.now().toString();
    setProperties([
      ...properties,
      {
        id: newId,
        type: 'property',
        propertyType: '',
      },
    ]);
    setExpandedProperty(newId);
  };

  const handleRemoveProperty = (id: string) => {
    if (properties.length > 1) {
      setProperties(properties.filter((p) => p.id !== id));
      if (expandedProperty === id) {
        setExpandedProperty(properties[0].id);
      }
    }
  };

  const handlePropertyChange = (id: string, field: keyof Property, value: any) => {
    setProperties(properties.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
          Vermietung & Verpachtung
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
        Einkünfte aus Vermietung & Verpachtung liegen vor, wenn Sie jemandem ein Gebäude, eine Wohnung oder ein Grundstü{' '}
        <Typography
          component="span"
          sx={{ color: ACTIVE_BLUE, textDecoration: 'underline', cursor: 'pointer' }}
        >
          ...mehr
        </Typography>
      </Typography>

      {properties.map((property, index) => (
        <Box key={property.id} sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: ACTIVE_BLUE,
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              onClick={() => setExpandedProperty(expandedProperty === property.id ? '' : property.id)}
            >
              {index + 1}. Objekt
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                size="small"
                onClick={handleAddProperty}
                sx={{ color: ACTIVE_BLUE }}
              >
                <AddIcon />
              </IconButton>
              {properties.length > 1 && (
                <IconButton
                  size="small"
                  onClick={() => handleRemoveProperty(property.id)}
                  sx={{ color: INACTIVE_COLOR }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Box>

          <Accordion
            expanded={expandedProperty === property.id}
            onChange={() => setExpandedProperty(expandedProperty === property.id ? '' : property.id)}
            sx={{
              boxShadow: 'none',
              border: '1px solid #E2E8F0',
              borderRadius: 2,
              '&:before': { display: 'none' },
              '&.Mui-expanded': { margin: 0 },
            }}
          >
            <AccordionSummary
              expandIcon={
                expandedProperty === property.id ? (
                  <ExpandLessIcon sx={{ color: INACTIVE_COLOR }} />
                ) : (
                  <ExpandMoreIcon sx={{ color: INACTIVE_COLOR }} />
                )
              }
              sx={{
                px: 2,
                py: 1.5,
                '&.Mui-expanded': { minHeight: 56 },
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 600, color: '#1E293B' }}>
                Allgemeine Angaben
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2, pb: 3, pt: 0 }}>
              <Box sx={{ mt: 2 }}>
                {/* Was haben Sie vermietet? */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                      Was haben Sie in 2025 vermietet?
                    </Typography>
                    <Tooltip
                      title="Wählen Sie aus, ob Sie eine Immobilie oder ein unbebautes Grundstück vermietet haben."
                      arrow
                    >
                      <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                        <HelpOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <RadioGroup
                    value={property.type}
                    onChange={(e) => handlePropertyChange(property.id, 'type', e.target.value)}
                  >
                    <FormControlLabel
                      value="property"
                      control={<Radio sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }} />}
                      label="Immobilie"
                    />
                    <FormControlLabel
                      value="land"
                      control={<Radio sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }} />}
                      label="Unbebautes Grundstück"
                    />
                  </RadioGroup>
                </Box>

                {/* Art der Immobilie */}
                {property.type === 'property' && (
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                        Um welche Art von Immobilie handelt es sich?
                      </Typography>
                      <Tooltip
                        title="Wählen Sie die Art der Immobilie aus (z.B. Wohnung, Haus, Geschäftsräume)."
                        arrow
                      >
                        <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                          <HelpOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <FormControl fullWidth size="small">
                      <Select
                        value={property.propertyType}
                        onChange={(e) => handlePropertyChange(property.id, 'propertyType', e.target.value)}
                        displayEmpty
                        sx={{
                          bgcolor: '#FFFFFF',
                          borderRadius: '8px',
                        }}
                      >
                        <MenuItem value="" disabled>
                          Bitte wählen
                        </MenuItem>
                        <MenuItem value="wohnung">Wohnung</MenuItem>
                        <MenuItem value="haus">Haus</MenuItem>
                        <MenuItem value="geschaeftsraeume">Geschäftsräume</MenuItem>
                        <MenuItem value="garage">Garage</MenuItem>
                        <MenuItem value="sonstige">Sonstige</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                )}

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
      ))}

      {/* Add Another Property Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddProperty}
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
          weiteres Objekt hinzufügen
        </Button>
      </Box>
    </Box>
  );
};

export default RentalLeasing;

