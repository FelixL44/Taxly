import React from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
  LinearProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Description as DocumentIcon,
  Delete as DeleteIcon,
  CloudUpload as UploadIcon,
} from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.neutral.light,
  '&:hover': {
    backgroundColor: theme.palette.neutral.light,
  },
}));

interface DocumentUploadStepProps {
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
  onFilesChange: (files: Array<{ category: string; file: File }>) => void;
  onNext: () => void;
  onBack: () => void;
  onError: (error: string | null) => void;
}

const DocumentUploadStep: React.FC<DocumentUploadStepProps> = ({
  incomeTypes,
  deductions,
  uploadedFiles,
  onFilesChange,
  onNext,
  onBack,
  onError,
}) => {
  const getRequiredDocuments = () => {
    const documents: string[] = [];

    // Add documents based on income types
    incomeTypes.forEach((type) => {
      switch (type) {
        case 'Land- und Forstwirtschaft':
          documents.push('Betriebliche Einnahmen-Ausgaben-Übersicht');
          break;
        case 'Gewerbebetrieb':
          documents.push('Betriebswirtschaftliche Auswertung');
          break;
        case 'Selbstständige Arbeit':
          documents.push('Umsatzsteuer-Voranmeldungen');
          break;
        case 'Nichtselbstständige Arbeit':
          documents.push('Lohnabrechnungen');
          break;
        case 'Kapitalvermögen':
          documents.push('Jahressteuerbescheinigung Konten/Depots');
          break;
        case 'Vermietung & Verpachtung':
          documents.push('Mietverträge');
          documents.push('Abschreibungsliste');
          break;
        case 'Sonstige Einkünfte':
          documents.push('Erläuterung der Einnahmequelle');
          break;
      }
    });

    // Add documents based on deductions
    if (deductions.homeOffice) {
      documents.push('Nachweis Arbeitsplatz-Arbeitsadresse');
    }
    if (deductions.commuterAllowance) {
      documents.push('Fahrtkosten-Nachweis');
    }
    if (deductions.childcare) {
      documents.push('Rechnungen der Betreuungseinrichtungen');
    }
    if (deductions.craftsmen) {
      documents.push('Handwerkerrechnungen');
    }
    if (deductions.donations) {
      documents.push('Spendenquittungen');
    }
    if (deductions.insurance) {
      documents.push('Vorsorge-Zahlungsnachweis');
    }

    return documents;
  };

  const handleFileUpload = (category: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const allowedTypes = ['.pdf', '.xlsx', '.csv'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      onError('Nur PDF, Excel und CSV Dateien sind erlaubt.');
      return;
    }

    // Update files
    const newFiles = uploadedFiles.filter((f) => f.category !== category);
    newFiles.push({ category, file });
    onFilesChange(newFiles);
    onError(null);
  };

  const handleFileDelete = (category: string) => {
    const newFiles = uploadedFiles.filter((f) => f.category !== category);
    onFilesChange(newFiles);
  };

  const requiredDocuments = getRequiredDocuments();
  const uploadedCount = uploadedFiles.length;
  const totalCount = requiredDocuments.length;

  const handleNext = () => {
    // Dokumente sind nicht mehr Pflicht, daher keine Prüfung mehr
    onNext();
  };

  return (
    <Box>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Benötigte Dokumente hochladen
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Laden Sie die angeforderten Dateien hoch, um fortzufahren.
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {uploadedCount} von {totalCount} Dateien hochgeladen
        </Typography>
        <LinearProgress
          variant="determinate"
          value={(uploadedCount / totalCount) * 100}
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Box>

      {requiredDocuments.map((doc) => {
        const uploadedFile = uploadedFiles.find((f) => f.category === doc);
        return (
          <StyledCard key={doc}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <DocumentIcon sx={{ color: 'primary.main', mr: 2 }} />
                <Typography color="text.primary">{doc}</Typography>
              </Box>
              {uploadedFile ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                    {uploadedFile.file.name}
                  </Typography>
                  <IconButton
                    color="error"
                    onClick={() => handleFileDelete(doc)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ) : (
                <Button
                  component="label"
                  variant="outlined"
                  color="primary"
                  startIcon={<UploadIcon />}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                  }}
                >
                  Datei auswählen
                  <input
                    type="file"
                    hidden
                    accept=".pdf,.xlsx,.csv"
                    onChange={(e) => handleFileUpload(doc, e)}
                  />
                </Button>
              )}
            </CardContent>
          </StyledCard>
        );
      })}

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
          onClick={handleNext}
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
          Weiter
        </Button>
      </Box>
    </Box>
  );
};

export default DocumentUploadStep; 