import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Paper,
  Alert,
  Button
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import axios from 'axios';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size?: number;
}

// Mock placeholder documents
const getPlaceholderDocuments = (category: string): Document[] => {
  const currentYear = new Date().getFullYear();
  const categoryNames: { [key: string]: string[] } = {
    payslips: ['Lohnabrechnung_Januar.pdf', 'Lohnabrechnung_Februar.pdf', 'Lohnabrechnung_März.pdf'],
    receipts: ['Rechnung_Handwerker.pdf', 'Rechnung_Büromaterial.pdf', 'Rechnung_Fachliteratur.pdf'],
    contracts: ['Arbeitsvertrag.pdf', 'Mietvertrag.pdf'],
    'bank-statements': ['Kontoauszug_Januar.pdf', 'Kontoauszug_Februar.pdf'],
    insurance: ['Versicherungspolice_Krankenversicherung.pdf', 'Versicherungspolice_Haftpflicht.pdf'],
    other: ['Sonstiges_Dokument.pdf'],
  };

  const names = categoryNames[category] || ['Dokument.pdf'];
  return names.map((name, index) => ({
    id: `doc-${category}-${index}`,
    name,
    type: category,
    uploadDate: new Date(currentYear, index, 15).toLocaleDateString('de-DE'),
    size: Math.floor(Math.random() * 500 + 100), // Random size between 100-600 KB
  }));
};

const getCategoryDisplayName = (category: string): string => {
  const categoryMap: { [key: string]: string } = {
    payslips: 'Lohnabrechnungen',
    receipts: 'Rechnungen & Belege',
    contracts: 'Verträge',
    'bank-statements': 'Kontoauszüge',
    insurance: 'Versicherungen',
    other: 'Sonstiges',
  };
  return categoryMap[category] || category;
};

export default function DocumentList() {
  const { category } = useParams<{ category: string }>();
  const currentYear = new Date().getFullYear();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = async () => {
    setLoading(true);
    setError(null);
    try {
      // In real app, this would be: const res = await axios.get(`/api/documents/${category}`);
      // For now, use placeholder documents
      setTimeout(() => {
        const placeholderDocs = getPlaceholderDocuments(category || '');
        setDocuments(placeholderDocs);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching documents:', error);
      setError('Dokumente konnten nicht geladen werden. Bitte versuchen Sie es später erneut.');
      setDocuments([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [category]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/documents/${id}`);
      setDocuments(documents.filter(doc => doc.id !== id));
    } catch (error) {
      console.error('Error deleting document:', error);
      setError('Dokument konnte nicht gelöscht werden. Bitte versuchen Sie es später erneut.');
    }
  };

  const handleDownload = async (id: string) => {
    try {
      const response = await axios.get(`/api/documents/${id}/download`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', documents.find(doc => doc.id === id)?.name || 'document');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading document:', error);
      setError('Dokument konnte nicht heruntergeladen werden. Bitte versuchen Sie es später erneut.');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
          Dokumente für {currentYear} - {getCategoryDisplayName(category || '')}
        </Typography>
        <Button
          startIcon={<RefreshIcon />}
          onClick={fetchDocuments}
          disabled={loading}
          sx={{
            bgcolor: '#32CE69',
            color: '#FFFFFF',
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#28B85A',
            },
          }}
        >
          Aktualisieren
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!Array.isArray(documents) ? (
        <Alert severity="error">
          Fehler beim Laden der Dokumente. Bitte versuchen Sie es erneut.
        </Alert>
      ) : documents.length === 0 ? (
        <Alert
          severity="info"
          sx={{
            bgcolor: '#EFF6FF',
            border: '1px solid #BFDBFE',
            '& .MuiAlert-icon': {
              color: '#3B82F6',
            },
          }}
        >
          Keine Dokumente in dieser Kategorie vorhanden.
        </Alert>
      ) : (
        <Box>
          {documents.map((doc) => (
            <Paper
              key={doc.id}
              elevation={0}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2.5,
                px: 2,
                py: 2,
                borderRadius: 3,
                boxShadow: '0 1px 6px 0 rgba(60,72,88,0.07)',
                minWidth: 400,
                maxWidth: 1200,
                mx: 'auto',
                background: '#fafbfc',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <InsertDriveFileIcon sx={{ fontSize: 36, color: 'primary.main', mr: 2 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" fontWeight={500} sx={{ mb: 0.5 }}>
                    {doc.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doc.type} &bull; {Math.round((doc.size || 0) / 1024 * 100) / 100} KB
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  edge="end"
                  aria-label="view"
                  onClick={() => {
                    // Handle view
                    console.log('View document:', doc.id);
                  }}
                  sx={{
                    bgcolor: '#F7F8F9',
                    borderRadius: 2,
                    '&:hover': { bgcolor: '#E2E8F0' },
                  }}
                >
                  <VisibilityIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="download"
                  onClick={() => handleDownload(doc.id)}
                  sx={{
                    bgcolor: '#F7F8F9',
                    borderRadius: 2,
                    '&:hover': { bgcolor: '#E2E8F0' },
                  }}
                >
                  <DownloadIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(doc.id)}
                  sx={{
                    bgcolor: '#FEE2E2',
                    borderRadius: 2,
                    color: '#EF4444',
                    '&:hover': { bgcolor: '#FECACA' },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
} 