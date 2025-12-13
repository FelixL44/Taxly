import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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

interface CarePerson {
  id: string;
  person: string;
}

const CareHomePlacement: React.FC<{ onBack: () => void }> = () => {
  const [persons, setPersons] = useState<CarePerson[]>([
    {
      id: '1',
      person: '',
    },
  ]);
  const [expandedPerson, setExpandedPerson] = useState<string>('1');

  const handleAddPerson = () => {
    const newId = Date.now().toString();
    setPersons([
      ...persons,
      {
        id: newId,
        person: '',
      },
    ]);
    setExpandedPerson(newId);
  };

  const handleRemovePerson = (id: string) => {
    if (persons.length > 1) {
      setPersons(persons.filter((p) => p.id !== id));
      if (expandedPerson === id) {
        setExpandedPerson(persons[0].id);
      }
    }
  };

  const handlePersonChange = (id: string, field: keyof CarePerson, value: any) => {
    setPersons(persons.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
          Pflege & Heimunterbringung
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
        In diesem Bereich können Sie sowohl Kosten für die Heimunterbringung als auch für Pflege- & Betreuungsleistu{' '}
        <Typography
          component="span"
          sx={{ color: ACTIVE_BLUE, textDecoration: 'underline', cursor: 'pointer' }}
        >
          ...mehr
        </Typography>
      </Typography>

      {persons.map((person, index) => (
        <Box key={person.id} sx={{ mb: 3 }}>
          {/* Tab Navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: ACTIVE_BLUE,
                textDecoration: 'underline',
              }}
            >
              {index + 1}. Pflegebedürftige Person
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                size="small"
                onClick={handleAddPerson}
                sx={{
                  bgcolor: ACTIVE_BLUE,
                  color: '#FFFFFF',
                  width: 32,
                  height: 32,
                  '&:hover': { bgcolor: '#2563EB' },
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
              {persons.length > 1 && (
                <IconButton
                  size="small"
                  onClick={() => handleRemovePerson(person.id)}
                  sx={{ color: INACTIVE_COLOR }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Box>

          {/* Form Card */}
          <Box sx={{ bgcolor: '#FFFFFF', borderRadius: 2, p: 3, border: '1px solid #E2E8F0' }}>
            <Accordion
              expanded={expandedPerson === person.id}
              onChange={() => setExpandedPerson(expandedPerson === person.id ? '' : person.id)}
              sx={{
                boxShadow: 'none',
                '&:before': { display: 'none' },
                '&.Mui-expanded': { margin: 0 },
              }}
            >
              <AccordionSummary
                expandIcon={
                  expandedPerson === person.id ? (
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
                  {/* Wer wurde gepflegt? */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                        Wer wurde gepflegt?
                      </Typography>
                      <Tooltip
                        title="Wählen Sie die Person aus, die gepflegt wurde."
                        arrow
                      >
                        <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                          <HelpOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <FormControl fullWidth size="small">
                      <Select
                        value={person.person}
                        onChange={(e) => handlePersonChange(person.id, 'person', e.target.value)}
                        displayEmpty
                        sx={{
                          bgcolor: '#FFFFFF',
                          borderRadius: '8px',
                        }}
                      >
                        <MenuItem value="" disabled>
                          Bitte wählen
                        </MenuItem>
                        <MenuItem value="self">Ich selbst</MenuItem>
                        <MenuItem value="spouse">Ehepartner</MenuItem>
                        <MenuItem value="child">Kind</MenuItem>
                        <MenuItem value="parent">Elternteil</MenuItem>
                        <MenuItem value="other">Sonstige</MenuItem>
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
        </Box>
      ))}

      {/* Add Another Person Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddPerson}
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
          weitere pflegebedürftige Person hinzufügen
        </Button>
      </Box>
    </Box>
  );
};

export default CareHomePlacement;

