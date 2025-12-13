import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
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
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

const ACTIVE_BLUE = '#3B82F6';
const INACTIVE_COLOR = '#475569';

const TaxPrepayments: React.FC = () => {
  const [expanded, setExpanded] = useState(true);
  const [hasPrepayments, setHasPrepayments] = useState(false);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
          Steuervorauszahlungen
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
        Wenn Sie in 2025 Steuervorauszahlungen leisten mussten, können Sie diese hier erfassen.{' '}
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
              Allgemeine Angaben
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0, pb: 0, pt: 2 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                  Haben Sie selbst Vorauszahlungen für 2025 gezahlt?
                </Typography>
                <Tooltip
                  title="Steuervorauszahlungen sind Zahlungen, die Sie im Voraus an das Finanzamt geleistet haben."
                  arrow
                >
                  <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                    <HelpOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <RadioGroup
                row
                value={hasPrepayments ? 'yes' : 'no'}
                onChange={(e) => setHasPrepayments(e.target.value === 'yes')}
                sx={{
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  p: 1,
                  display: 'inline-flex',
                }}
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

export default TaxPrepayments;

