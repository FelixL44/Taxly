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

interface Activity {
  id: string;
  description: string;
  person: string;
  knowsIncomeType: boolean;
  activityType: string;
}

const SelfEmployment: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      description: '',
      person: 'Félix',
      knowsIncomeType: false,
      activityType: '',
    },
  ]);
  const [expandedActivity, setExpandedActivity] = useState<string>('1');

  const handleAddActivity = () => {
    const newId = Date.now().toString();
    setActivities([
      ...activities,
      {
        id: newId,
        description: '',
        person: 'Félix',
        knowsIncomeType: false,
        activityType: '',
      },
    ]);
    setExpandedActivity(newId);
  };

  const handleRemoveActivity = (id: string) => {
    if (activities.length > 1) {
      setActivities(activities.filter((a) => a.id !== id));
      if (expandedActivity === id) {
        setExpandedActivity(activities[0].id);
      }
    }
  };

  const handleActivityChange = (id: string, field: keyof Activity, value: any) => {
    setActivities(activities.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
          Selbständigkeit & Gewerbe
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
        Im Bereich Selbständigkeit & Gewerbe können folgende Einkünfte angegeben werden:{' '}
        <Typography
          component="span"
          sx={{ color: ACTIVE_BLUE, textDecoration: 'underline', cursor: 'pointer' }}
        >
          ...mehr
        </Typography>
      </Typography>

      {/* Add Activity Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <IconButton
          onClick={handleAddActivity}
          sx={{
            bgcolor: ACTIVE_BLUE,
            color: '#FFFFFF',
            '&:hover': { bgcolor: '#2563EB' },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {activities.map((activity, index) => (
        <Box key={activity.id} sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: ACTIVE_BLUE,
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              onClick={() => setExpandedActivity(expandedActivity === activity.id ? '' : activity.id)}
            >
              {index + 1}. Tätigkeit
            </Typography>
            {activities.length > 1 && (
              <IconButton
                size="small"
                onClick={() => handleRemoveActivity(activity.id)}
                sx={{ color: INACTIVE_COLOR }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Box>

          <Accordion
            expanded={expandedActivity === activity.id}
            onChange={() => setExpandedActivity(expandedActivity === activity.id ? '' : activity.id)}
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
                expandedActivity === activity.id ? (
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
                {/* Bezeichnung der Tätigkeit */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                      Bezeichnung der Tätigkeit
                    </Typography>
                    <Tooltip
                      title="Geben Sie eine kurze Bezeichnung für Ihre selbständige Tätigkeit an."
                      arrow
                    >
                      <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                        <HelpOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <FormControl fullWidth size="small">
                    <Select
                      value={activity.description}
                      onChange={(e) => handleActivityChange(activity.id, 'description', e.target.value)}
                      displayEmpty
                      sx={{
                        bgcolor: '#FFFFFF',
                        borderRadius: '8px',
                      }}
                    >
                      <MenuItem value="" disabled>
                        Bitte wählen
                      </MenuItem>
                      <MenuItem value="kleinunternehmer">Kleinunternehmer</MenuItem>
                      <MenuItem value="uebungsleiter">Übungsleiter</MenuItem>
                      <MenuItem value="ehrenamt">Ehrenamt</MenuItem>
                      <MenuItem value="freiberufler">Freiberufler</MenuItem>
                      <MenuItem value="gewerbe">Gewerbe</MenuItem>
                      <MenuItem value="sonstige">Sonstige</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Wer hat diese Tätigkeit ausgeübt? */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                      Wer hat diese Tätigkeit ausgeübt?
                    </Typography>
                    <Tooltip
                      title="Wählen Sie die Person aus, die diese Tätigkeit ausgeübt hat."
                      arrow
                    >
                      <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                        <HelpOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <FormControl fullWidth size="small">
                    <Select
                      value={activity.person}
                      onChange={(e) => handleActivityChange(activity.id, 'person', e.target.value)}
                      sx={{
                        bgcolor: '#FFFFFF',
                        borderRadius: '8px',
                      }}
                    >
                      <MenuItem value="Félix">Félix</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Kennen Sie die Einkunftsart? */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                      Kennen Sie die Einkunftsart für diese Tätigkeit?
                    </Typography>
                    <Tooltip
                      title="Die Einkunftsart bestimmt, wie die Einkünfte besteuert werden (z.B. Einkünfte aus selbständiger Arbeit, Einkünfte aus Gewerbebetrieb)."
                      arrow
                    >
                      <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                        <HelpOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <RadioGroup
                    value={activity.knowsIncomeType ? 'yes' : 'no'}
                    onChange={(e) => handleActivityChange(activity.id, 'knowsIncomeType', e.target.value === 'yes')}
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

                {/* Haben Sie eine Tätigkeit aus der Liste ausgeübt? */}
                {!activity.knowsIncomeType && (
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                        Haben Sie eine Tätigkeit aus der Liste ausgeübt?
                      </Typography>
                      <Tooltip
                        title="Wählen Sie eine Tätigkeit aus der Liste aus, um Unterstützung bei der Bestimmung der Einkunftsart zu erhalten."
                        arrow
                      >
                        <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                          <HelpOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <FormControl fullWidth size="small">
                      <Select
                        value={activity.activityType}
                        onChange={(e) => handleActivityChange(activity.id, 'activityType', e.target.value)}
                        displayEmpty
                        sx={{
                          bgcolor: '#FFFFFF',
                          borderRadius: '8px',
                        }}
                      >
                        <MenuItem value="" disabled>
                          Bitte wählen
                        </MenuItem>
                        <MenuItem value="kleinunternehmer">Kleinunternehmer</MenuItem>
                        <MenuItem value="uebungsleiter">Übungsleiter</MenuItem>
                        <MenuItem value="ehrenamt">Ehrenamt</MenuItem>
                        <MenuItem value="freiberufler">Freiberufler</MenuItem>
                        <MenuItem value="gewerbe">Gewerbe</MenuItem>
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

      {/* Add Another Activity Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddActivity}
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
          weitere Tätigkeit hinzufügen
        </Button>
      </Box>
    </Box>
  );
};

export default SelfEmployment;

