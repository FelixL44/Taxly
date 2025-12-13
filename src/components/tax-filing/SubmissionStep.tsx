import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  Send as SendIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Euro as EuroIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';

const BRAND_GREEN = '#32CE69';
const ACTIVE_BLUE = '#3B82F6';
const INACTIVE_COLOR = '#475569';

interface SubmissionStepProps {
  onBack: () => void;
  onSubmit: () => void;
}

const SubmissionStep: React.FC<SubmissionStepProps> = ({ onBack, onSubmit }) => {
  // Mock data - in real app, this would come from state/props
  const summaryData = {
    personal: {
      name: 'Félix Lick',
      status: 'Vollständig',
    },
    employee: {
      tasks: 10,
      completed: 3,
      totalAmount: 126,
    },
    otherIncome: {
      selected: 1,
      total: 0,
    },
    generalExpenses: {
      selected: 2,
      total: 0,
    },
  };

  return (
    <Box sx={{ bgcolor: '#F7F8F9', minHeight: '100%', pb: 4 }}>
      <Box sx={{ px: 3, pt: 3 }}>
        {/* Title */}
        <Typography variant="h5" sx={{ mb: 4, fontWeight: 600, color: '#1E293B' }}>
          Abgabe
        </Typography>

        {/* Preview Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1E293B' }}>
            Übersicht Ihrer Eingaben
          </Typography>

          <Card sx={{ mb: 2, border: '1px solid #E2E8F0' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <PersonIcon sx={{ color: ACTIVE_BLUE, fontSize: 24 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E293B' }}>
                  Persönliches
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <List dense>
                <ListItem disablePadding>
                  <ListItemText
                    primary="Name"
                    secondary={summaryData.personal.name}
                    primaryTypographyProps={{ color: INACTIVE_COLOR, fontSize: '14px' }}
                    secondaryTypographyProps={{ color: '#1E293B', fontWeight: 500 }}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primary="Status"
                    secondary={summaryData.personal.status}
                    primaryTypographyProps={{ color: INACTIVE_COLOR, fontSize: '14px' }}
                    secondaryTypographyProps={{ color: BRAND_GREEN, fontWeight: 500 }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card sx={{ mb: 2, border: '1px solid #E2E8F0' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <WorkIcon sx={{ color: ACTIVE_BLUE, fontSize: 24 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E293B' }}>
                  Arbeitnehmer
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <List dense>
                <ListItem disablePadding>
                  <ListItemText
                    primary="Erfasste Themen"
                    secondary={`${summaryData.employee.completed} von ${summaryData.employee.tasks}`}
                    primaryTypographyProps={{ color: INACTIVE_COLOR, fontSize: '14px' }}
                    secondaryTypographyProps={{ color: '#1E293B', fontWeight: 500 }}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText
                    primary="Gesamtbetrag"
                    secondary={`${summaryData.employee.totalAmount.toLocaleString('de-DE')},- €`}
                    primaryTypographyProps={{ color: INACTIVE_COLOR, fontSize: '14px' }}
                    secondaryTypographyProps={{ color: '#1E293B', fontWeight: 500 }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card sx={{ mb: 2, border: '1px solid #E2E8F0' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <EuroIcon sx={{ color: ACTIVE_BLUE, fontSize: 24 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E293B' }}>
                  Weitere Einkünfte
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <List dense>
                <ListItem disablePadding>
                  <ListItemText
                    primary="Ausgewählte Themen"
                    secondary={`${summaryData.otherIncome.selected} Thema${summaryData.otherIncome.selected !== 1 ? 'n' : ''}`}
                    primaryTypographyProps={{ color: INACTIVE_COLOR, fontSize: '14px' }}
                    secondaryTypographyProps={{ color: '#1E293B', fontWeight: 500 }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Card sx={{ mb: 2, border: '1px solid #E2E8F0' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <ReceiptIcon sx={{ color: ACTIVE_BLUE, fontSize: 24 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E293B' }}>
                  Allgemeine Ausgaben
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <List dense>
                <ListItem disablePadding>
                  <ListItemText
                    primary="Ausgewählte Themen"
                    secondary={`${summaryData.generalExpenses.selected} Thema${summaryData.generalExpenses.selected !== 1 ? 'n' : ''}`}
                    primaryTypographyProps={{ color: INACTIVE_COLOR, fontSize: '14px' }}
                    secondaryTypographyProps={{ color: '#1E293B', fontWeight: 500 }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>

        {/* Submit Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            startIcon={<SendIcon />}
            onClick={onSubmit}
            sx={{
              bgcolor: BRAND_GREEN,
              color: '#FFFFFF',
              textTransform: 'none',
              px: 4,
              py: 1.5,
              fontSize: '16px',
              fontWeight: 600,
              '&:hover': { bgcolor: '#28B85A' },
            }}
          >
            An Steuerberater weiterleiten
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SubmissionStep;

