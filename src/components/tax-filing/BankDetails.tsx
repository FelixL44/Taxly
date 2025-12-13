import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

const BRAND_GREEN = '#32CE69';
const ACTIVE_BLUE = '#3B82F6';
const INACTIVE_COLOR = '#475569';

const BankDetails: React.FC<{ onBack: () => void }> = () => {
  const [expanded, setExpanded] = useState(true);
  const [accountRecorded, setAccountRecorded] = useState(true);
  const [accountHolder, setAccountHolder] = useState('Félix Lick');
  const [iban, setIban] = useState('DE19 6906 1800 0004 8158 07');
  const [bankName, setBankName] = useState('Volksbank Überlingen');

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
          Bankverbindung
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
        Das Finanzamt benötigt Ihre Bankverbindung, um Ihre Steuererstattung zeitnah überweisen zu können.{' '}
        <Typography
          component="span"
          sx={{ color: ACTIVE_BLUE, textDecoration: 'underline', cursor: 'pointer' }}
        >
          ...mehr
        </Typography>
      </Typography>

      {/* Bankverbindung Card */}
      <Box
        sx={{
          bgcolor: '#FFFFFF',
          borderRadius: 2,
          border: '1px solid #E2E8F0',
          borderLeft: `4px solid ${BRAND_GREEN}`,
        }}
      >
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
              px: 3,
              py: 2,
              '&.Mui-expanded': { minHeight: 56 },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E293B', flexGrow: 1 }}>
              Bankverbindung
            </Typography>
            <Button
              variant="text"
              onClick={(e) => {
                e.stopPropagation();
                // Handle edit
              }}
              sx={{
                textTransform: 'none',
                color: ACTIVE_BLUE,
                mr: 2,
                minWidth: 'auto',
              }}
            >
              ändern
            </Button>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                  Konto erfassen
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                  {accountRecorded ? 'Ja' : 'Nein'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                  Kontoinhaber
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                  {accountHolder}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                  IBAN
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                  {iban}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                  Bankname
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                  {bankName}
                </Typography>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default BankDetails;

