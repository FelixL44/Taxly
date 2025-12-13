import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
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

const TaxOfficeNumber: React.FC = () => {
  const [expandedTaxOffice, setExpandedTaxOffice] = useState(true);
  const [expandedIdNumber, setExpandedIdNumber] = useState(true);
  const [federalState] = useState('Berlin');
  const [taxOffice] = useState('Friedrichshain-Kreuzberg');
  const [taxNumberKnown] = useState(false);
  const [idNumber] = useState('');

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
          Finanzamt & Steuernummer
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
        Angaben zu Ihrem zuständigen Finanzamt und Ihrer Steuernummer sind für Ihre digitale Steuererklärung und{' '}
        <Typography
          component="span"
          sx={{ color: ACTIVE_BLUE, textDecoration: 'underline', cursor: 'pointer' }}
        >
          ...mehr
        </Typography>
      </Typography>

      {/* Finanzamt & Steuernummer Card */}
      <Box
        sx={{
          bgcolor: '#FFFFFF',
          borderRadius: 2,
          border: '1px solid #E2E8F0',
          borderLeft: `4px solid ${BRAND_GREEN}`,
          mb: 2,
        }}
      >
        <Accordion
          expanded={expandedTaxOffice}
          onChange={() => setExpandedTaxOffice(!expandedTaxOffice)}
          sx={{
            boxShadow: 'none',
            '&:before': { display: 'none' },
            '&.Mui-expanded': { margin: 0 },
          }}
        >
          <AccordionSummary
            expandIcon={
              expandedTaxOffice ? (
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
              Finanzamt & Steuernummer
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
                  Bundesland
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                  {federalState}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                  Finanzamt
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                  {taxOffice}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                  Steuernummer bekannt
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                  {taxNumberKnown ? 'Ja' : 'Nein'}
                </Typography>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Identifikationsnummer Card */}
      <Box
        sx={{
          bgcolor: '#FFFFFF',
          borderRadius: 2,
          border: '1px solid #E2E8F0',
          borderLeft: `4px solid ${BRAND_GREEN}`,
        }}
      >
        <Accordion
          expanded={expandedIdNumber}
          onChange={() => setExpandedIdNumber(!expandedIdNumber)}
          sx={{
            boxShadow: 'none',
            '&:before': { display: 'none' },
            '&.Mui-expanded': { margin: 0 },
          }}
        >
          <AccordionSummary
            expandIcon={
              expandedIdNumber ? (
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
              Identifikationsnummer
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
            {idNumber ? (
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                {idNumber}
              </Typography>
            ) : (
              <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                keine Angaben
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default TaxOfficeNumber;

