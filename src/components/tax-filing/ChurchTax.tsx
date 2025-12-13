import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  HelpOutline as HelpOutlineIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

const ACTIVE_BLUE = '#3B82F6';
const INACTIVE_COLOR = '#475569';

const ChurchTax: React.FC<{ onBack: () => void }> = () => {
  const [expanded, setExpanded] = useState(true);
  const [refunds, setRefunds] = useState(0);
  const [payments, setPayments] = useState(0);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
          Kirchensteuer & Kirchgeld
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
        In 2025 gezahlte Kirchensteuer & Kirchgeld können Sie von der Steuer absetzen. Hierbei werden Zahlungen mit Erstattung{' '}
        <Typography
          component="span"
          sx={{ color: ACTIVE_BLUE, textDecoration: 'underline', cursor: 'pointer' }}
        >
          ...mehr
        </Typography>
      </Typography>

      {/* Form Card */}
      <Box sx={{ bgcolor: '#FFFFFF', borderRadius: 2, p: 3, border: '1px solid #E2E8F0' }}>
        <Accordion
          expanded={expanded}
          onChange={() => setExpanded(!expanded)}
          sx={{
            boxShadow: 'none',
            '&:before': { display: 'none' },
            '&.Mui-expanded': { margin: 0 },
          }}
        >
          <AccordionSummary
            expandIcon={
              expanded ? (
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
              Kirchensteuer & Kirchgeld
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0, pb: 0, pt: 2 }}>
            <Box>
              {/* In 2025 erhaltene Erstattungen */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#1E293B', mb: 2 }}>
                  In 2025 erhaltene Erstattungen
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                    Erhaltene Erstattungen
                  </Typography>
                  <Tooltip
                    title="Geben Sie die erhaltenen Erstattungen für Kirchensteuer & Kirchgeld an."
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
                  value={refunds}
                  onChange={(e) => setRefunds(parseFloat(e.target.value) || 0)}
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

              {/* In 2025 geleistete Zahlungen */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#1E293B', mb: 2 }}>
                  In 2025 geleistete Zahlungen
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                    Geleistete Zahlungen
                  </Typography>
                  <Tooltip
                    title="Geben Sie die geleisteten Zahlungen für Kirchensteuer & Kirchgeld an."
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
                  value={payments}
                  onChange={(e) => setPayments(parseFloat(e.target.value) || 0)}
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
  );
};

export default ChurchTax;

