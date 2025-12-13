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
  Alert,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  HelpOutline as HelpOutlineIcon,
  Info as InfoIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

const ACTIVE_BLUE = '#3B82F6';
const INACTIVE_COLOR = '#475569';

const AdditionalInformation: React.FC = () => {
  const [expanded, setExpanded] = useState(true);
  const [provideAdditional, setProvideAdditional] = useState(false);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
          Ergänzende Angaben
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
        In diesem Bereich können Sie dem Finanzamt ergänzende Angaben zu Ihrer Steuererklärung mitteilen.{' '}
        <Typography
          component="span"
          sx={{ color: ACTIVE_BLUE, textDecoration: 'underline', cursor: 'pointer' }}
        >
          ...mehr
        </Typography>
      </Typography>

      {/* Warning Alert */}
      <Alert
        severity="info"
        icon={<InfoIcon />}
        sx={{
          mb: 4,
          bgcolor: '#EFF6FF',
          border: '1px solid #BFDBFE',
          borderLeft: `4px solid ${ACTIVE_BLUE}`,
          '& .MuiAlert-icon': {
            color: ACTIVE_BLUE,
          },
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E40AF', mb: 1 }}>
          Wichtig!
        </Typography>
        <Typography variant="body2" sx={{ color: '#1E40AF' }}>
          Wenn Sie ergänzende Angaben eintragen, wird Ihre Steuererklärung vom Finanzamt <strong>manuell geprüft</strong>. Dadurch dauert die Bearbeitung beim Finanzamt in der Regel länger.
        </Typography>
      </Alert>

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
              Ergänzende Angaben
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0, pb: 0, pt: 2 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                  Möchten Sie dem Finanzamt ergänzende Angaben mitteilen? (selten)
                </Typography>
                <Tooltip
                  title="Ergänzende Angaben werden nur in seltenen Fällen benötigt und führen zu einer manuellen Prüfung."
                  arrow
                >
                  <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                    <HelpOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <RadioGroup
                row
                value={provideAdditional ? 'yes' : 'no'}
                onChange={(e) => setProvideAdditional(e.target.value === 'yes')}
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

export default AdditionalInformation;

