import React from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  CheckCircle as CheckIcon,
  Description as DocumentIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.neutral.light,
  '&:hover': {
    backgroundColor: theme.palette.neutral.light,
  },
}));

interface ReviewStepProps {
  year: number;
  incomeTypes: string[];
  deductions: {
    homeOffice?: boolean;
    commuterAllowance?: boolean;
    childcare?: boolean;
    craftsmen?: boolean;
    donations?: boolean;
    insurance?: boolean;
  };
  uploadedFiles: Array<{
    category: string;
    file: File;
  }>;
  onSubmit: () => void;
  onBack: () => void;
  onError: (error: string | null) => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({
  year,
  incomeTypes,
  deductions,
  uploadedFiles,
  onSubmit,
  onBack,
  onError,
}) => {
  const getDeductionLabel = (key: string): string => {
    switch (key) {
      case 'homeOffice':
        return 'Home Office';
      case 'commuterAllowance':
        return 'Pendlerpauschale';
      case 'childcare':
        return 'Kinderbetreuungskosten';
      case 'craftsmen':
        return 'Handwerkerleistungen';
      case 'donations':
        return 'Spenden';
      case 'insurance':
        return 'Versicherungsbeiträge';
      default:
        return key;
    }
  };

  const selectedDeductions = Object.entries(deductions)
    .filter(([_, value]) => value)
    .map(([key]) => getDeductionLabel(key));

  const handleSubmit = () => {
    // Here you would typically make an API call to submit the tax filing
    onSubmit();
  };

  return (
    <Box>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Überprüfen Sie Ihre Angaben
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Bitte überprüfen Sie alle Angaben, bevor Sie die Steuererklärung absenden.
      </Typography>

      <StyledCard>
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>
            Steuerjahr {year}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Einkunftsarten"
                secondary={incomeTypes.join(', ')}
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemIcon>
                <CheckIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Ausgewählte Absetzungen"
                secondary={selectedDeductions.length > 0 ? selectedDeductions.join(', ') : 'Keine'}
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemIcon>
                <DocumentIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Hochgeladene Dokumente"
                secondary={`${uploadedFiles.length} Dokumente`}
              />
            </ListItem>
          </List>
        </CardContent>
      </StyledCard>

      <Alert severity="info" sx={{ mt: 3, mb: 3 }}>
        Nach dem Absenden können Sie die Steuererklärung nicht mehr bearbeiten. Bitte stellen Sie sicher, dass alle Angaben korrekt sind.
      </Alert>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={onBack}
          sx={{
            px: 3,
            py: 1.5,
            borderRadius: 2,
          }}
        >
          Zurück
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            px: 3,
            py: 1.5,
            borderRadius: 2,
            boxShadow: 2,
            '&:hover': {
              bgcolor: 'primary.light',
              transform: 'translateY(-2px)',
            },
          }}
        >
          Steuererklärung absenden
        </Button>
      </Box>
    </Box>
  );
};

export default ReviewStep; 