import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Paper,
  LinearProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import { Folder as FolderIcon } from '@mui/icons-material';
import axios from 'axios';

const documentTypes = [
  'Lohnsteuerbescheinigung',
  'Rentenversicherungsnachweis',
  'Krankenversicherungsnachweis',
  'Arbeitslosenversicherungsnachweis',
  'Pflegeversicherungsnachweis',
  'Kirchensteuerbescheinigung',
  'Sonstiges'
];

export default function DocumentUpload() {
  const { category } = useParams<{ category: string }>();
  const currentYear = new Date().getFullYear();
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setError(null);
    }
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Bitte wählen Sie eine Datei aus');
      return;
    }

    if (!type) {
      setError('Bitte wählen Sie einen Dokumenttyp aus');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    formData.append('year', currentYear.toString());
    formData.append('category', category || '');

    setUploading(true);
    setProgress(0);
    setError(null);
    setSuccess(false);

    try {
      await axios.post('/api/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setProgress(percentCompleted);
        },
      });

      setSuccess(true);
      setFile(null);
      setType('');
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (error) {
      setError('Fehler beim Hochladen der Datei');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#1E293B' }}>
        Dokument hochladen für {currentYear}
      </Typography>

      <Box sx={{ mb: 3 }}>
        <input
          accept=".pdf,.jpg,.jpeg,.png"
          style={{ display: 'none' }}
          id="file-upload"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload">
          <Button
            variant="outlined"
            component="span"
            startIcon={<FolderIcon />}
            disabled={uploading}
            sx={{
              mb: 2,
              borderColor: '#32CE69',
              color: '#32CE69',
              '&:hover': {
                borderColor: '#28B85A',
                bgcolor: '#F0FDF4',
              },
            }}
          >
            Datei auswählen
          </Button>
        </label>
        {file && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Ausgewählte Datei: {file.name}
          </Typography>
        )}
      </Box>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="document-type-label">Dokumenttyp</InputLabel>
        <Select
          labelId="document-type-label"
          value={type}
          label="Dokumenttyp"
          onChange={handleTypeChange}
          disabled={uploading}
        >
          {documentTypes.map((docType) => (
            <MenuItem key={docType} value={docType}>
              {docType}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {uploading && (
        <Box sx={{ width: '100%', mb: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
            {progress}% hochgeladen
          </Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Dokument erfolgreich hochgeladen
        </Alert>
      )}

      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={uploading || !file || !type}
        fullWidth
        sx={{
          bgcolor: '#32CE69',
          color: '#FFFFFF',
          textTransform: 'none',
          py: 1.5,
          '&:hover': {
            bgcolor: '#28B85A',
          },
          '&:disabled': {
            bgcolor: '#E2E8F0',
            color: '#94A3B8',
          },
        }}
      >
        {uploading ? 'Wird hochgeladen...' : 'Hochladen'}
      </Button>
    </Paper>
  );
} 