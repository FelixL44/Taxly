import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  CircularProgress,
  Paper,
  Divider,
  Alert,
  Button
} from '@mui/material';
import {
  Description as DescriptionIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon
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

export default function DocumentList() {
  const { year, category } = useParams<{ year: string; category: string }>();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/documents/${year}/${category}`);
      // Ensure we always set an array, even if the response is null/undefined
      const data = res.data;
      setDocuments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      setError('Dokumente konnten nicht geladen werden. Bitte versuchen Sie es später erneut.');
      setDocuments([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [year, category]);

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
        <Typography variant="h5">
          Dokumente für {year} - {category}
        </Typography>
        <Button
          startIcon={<RefreshIcon />}
          onClick={fetchDocuments}
          disabled={loading}
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
        <Alert severity="info">
          Keine Dokumente in dieser Kategorie vorhanden.
        </Alert>
      ) : (
        <Box>
          {documents.map((doc, index) => (
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mr: 2, minWidth: 48, textAlign: 'right' }}>
                  {year}
                </Typography>
                <IconButton
                  edge="end"
                  aria-label="download"
                  onClick={() => handleDownload(doc.id)}
                  sx={{ bgcolor: '#f3f4f6', borderRadius: 2 }}
                >
                  <DownloadIcon />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
} 