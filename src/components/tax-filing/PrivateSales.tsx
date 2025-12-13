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
  Chip,
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

interface Sale {
  id: string;
  type: 'crypto' | 'property' | 'item';
  owner: string;
  description: string;
}

const PrivateSales: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [sales, setSales] = useState<Sale[]>([
    {
      id: '1',
      type: 'crypto',
      owner: 'Félix',
      description: '',
    },
  ]);
  const [expandedSale, setExpandedSale] = useState<string>('1');

  const handleAddSale = () => {
    const newId = Date.now().toString();
    setSales([
      ...sales,
      {
        id: newId,
        type: 'crypto',
        owner: 'Félix',
        description: '',
      },
    ]);
    setExpandedSale(newId);
  };

  const handleRemoveSale = (id: string) => {
    if (sales.length > 1) {
      setSales(sales.filter((s) => s.id !== id));
      if (expandedSale === id) {
        setExpandedSale(sales[0].id);
      }
    }
  };

  const handleSaleChange = (id: string, field: keyof Sale, value: any) => {
    setSales(sales.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
          Private Veräußerungsgeschäfte
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
        Ein privates Veräußerungsgeschäft ist der Verkauf von Kryptowährungen, Immobilien und privaten Gegenständen{' '}
        <Typography
          component="span"
          sx={{ color: ACTIVE_BLUE, textDecoration: 'underline', cursor: 'pointer' }}
        >
          ...mehr
        </Typography>
      </Typography>

      {sales.map((sale, index) => (
        <Box key={sale.id} sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: ACTIVE_BLUE,
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              onClick={() => setExpandedSale(expandedSale === sale.id ? '' : sale.id)}
            >
              {index + 1}. Objekt
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                size="small"
                onClick={handleAddSale}
                sx={{ color: ACTIVE_BLUE }}
              >
                <AddIcon />
              </IconButton>
              {sales.length > 1 && (
                <IconButton
                  size="small"
                  onClick={() => handleRemoveSale(sale.id)}
                  sx={{ color: INACTIVE_COLOR }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Box>

          <Accordion
            expanded={expandedSale === sale.id}
            onChange={() => setExpandedSale(expandedSale === sale.id ? '' : sale.id)}
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
                expandedSale === sale.id ? (
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
                Angaben zum Verkauf
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2, pb: 3, pt: 0 }}>
              <Box sx={{ mt: 2 }}>
                {/* Was haben Sie verkauft? */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                      Was haben Sie verkauft?
                    </Typography>
                    <Tooltip
                      title="Wählen Sie die Art des verkauften Objekts aus."
                      arrow
                    >
                      <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                        <HelpOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <RadioGroup
                    value={sale.type}
                    onChange={(e) => handleSaleChange(sale.id, 'type', e.target.value as any)}
                  >
                    <FormControlLabel
                      value="crypto"
                      control={<Radio sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }} />}
                      label="Kryptowährung (z. B. Bitcoin)"
                    />
                    <FormControlLabel
                      value="property"
                      control={<Radio sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }} />}
                      label="Immobilie / Grundstück"
                    />
                    <FormControlLabel
                      value="item"
                      control={<Radio sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }} />}
                      label="Privater Gegenstand (z. B. Oldtimer)"
                    />
                  </RadioGroup>
                </Box>

                {/* Wer war Eigentümer? */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                      Wer war Eigentümer der {sale.type === 'crypto' ? 'Kryptowährung' : sale.type === 'property' ? 'Immobilie' : 'Gegenstands'}?
                    </Typography>
                    <Tooltip
                      title="Wählen Sie die Person aus, die Eigentümer des verkauften Objekts war."
                      arrow
                    >
                      <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                        <HelpOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <FormControl fullWidth size="small">
                    <Select
                      value={sale.owner}
                      onChange={(e) => handleSaleChange(sale.id, 'owner', e.target.value)}
                      sx={{
                        bgcolor: '#FFFFFF',
                        borderRadius: '8px',
                      }}
                    >
                      <MenuItem value="Félix">Félix</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Bezeichnung */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                      Bezeichnung {sale.type === 'crypto' ? '(z. B. Name der Währung)' : sale.type === 'property' ? '(z. B. Adresse)' : '(z. B. Marke, Modell)'}
                    </Typography>
                    <Tooltip
                      title="Geben Sie eine kurze Bezeichnung des verkauften Objekts an."
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
                    value={sale.description}
                    onChange={(e) => handleSaleChange(sale.id, 'description', e.target.value)}
                    placeholder={sale.type === 'crypto' ? 'z.B. Bitcoin' : sale.type === 'property' ? 'z.B. Musterstraße 1, 12345 Berlin' : 'z.B. Porsche 911'}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: '#FFFFFF',
                        borderRadius: '8px',
                      },
                    }}
                  />
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
      ))}

      {/* Add Another Sale Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddSale}
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
          weiteren Verkauf hinzufügen
        </Button>
      </Box>
    </Box>
  );
};

export default PrivateSales;

