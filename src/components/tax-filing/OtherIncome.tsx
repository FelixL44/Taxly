import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
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

interface OtherIncomeEntry {
  id: string;
  description: string;
}

const otherIncomeTypes = [
  'Vergütung für gelegentliche Tätigkeiten',
  'Vergütung für Nebenjobs',
  'Vergütung für Beratungstätigkeiten',
  'Sonstige Einnahmen',
];

const OtherIncome: React.FC = () => {
  const [entries, setEntries] = useState<OtherIncomeEntry[]>([
    {
      id: '1',
      description: '',
    },
  ]);
  const [expandedEntry, setExpandedEntry] = useState<string>('1');

  const handleAddEntry = () => {
    const newId = Date.now().toString();
    setEntries([
      ...entries,
      {
        id: newId,
        description: '',
      },
    ]);
    setExpandedEntry(newId);
  };

  const handleRemoveEntry = (id: string) => {
    if (entries.length > 1) {
      setEntries(entries.filter((e) => e.id !== id));
      if (expandedEntry === id) {
        setExpandedEntry(entries[0].id);
      }
    }
  };

  const handleEntryChange = (id: string, field: keyof OtherIncomeEntry, value: any) => {
    setEntries(entries.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
          Sonstige Einkünfte
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
        Sonstige Einkünfte liegen vor, wenn Sie Einnahmen für gelegentliche Tätigkeiten erhalten haben.{' '}
        <Typography
          component="span"
          sx={{ color: ACTIVE_BLUE, textDecoration: 'underline', cursor: 'pointer' }}
        >
          ...mehr
        </Typography>
      </Typography>

      {/* Add Entry Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <IconButton
          onClick={handleAddEntry}
          sx={{
            bgcolor: ACTIVE_BLUE,
            color: '#FFFFFF',
            '&:hover': { bgcolor: '#2563EB' },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {entries.map((entry, index) => (
        <Box key={entry.id} sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: ACTIVE_BLUE,
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              onClick={() => setExpandedEntry(expandedEntry === entry.id ? '' : entry.id)}
            >
              {index + 1}. Eintrag
            </Typography>
            {entries.length > 1 && (
              <IconButton
                size="small"
                onClick={() => handleRemoveEntry(entry.id)}
                sx={{ color: INACTIVE_COLOR }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Box>

          <Accordion
            expanded={expandedEntry === entry.id}
            onChange={() => setExpandedEntry(expandedEntry === entry.id ? '' : entry.id)}
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
                expandedEntry === entry.id ? (
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
                {/* Bezeichnung */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                      Bezeichnung
                    </Typography>
                    <Tooltip
                      title="Geben Sie eine kurze Bezeichnung für die sonstige Einkunftsart an."
                      arrow
                    >
                      <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                        <HelpOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <FormControl fullWidth size="small">
                    <Select
                      value={entry.description}
                      onChange={(e) => handleEntryChange(entry.id, 'description', e.target.value)}
                      displayEmpty
                      sx={{
                        bgcolor: '#FFFFFF',
                        borderRadius: '8px',
                      }}
                    >
                      <MenuItem value="" disabled>
                        Bitte wählen
                      </MenuItem>
                      {otherIncomeTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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

      {/* Add Another Entry Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddEntry}
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
          weitere sonstige Einkünfte hinzufügen
        </Button>
      </Box>
    </Box>
  );
};

export default OtherIncome;

