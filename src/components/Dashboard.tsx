import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  IconButton,
  Tooltip,
  Alert,
} from '@mui/material';
import {
  Receipt as ReceiptIcon,
  Description as DocumentIcon,
  Event as EventIcon,
  Info as InfoIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { Todo, Document } from '../types';
import FeedbackWidget from './FeedbackWidget';
import HelpTooltip from './HelpTooltip';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [missingDocs, setMissingDocs] = useState<Document[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fetch user's todos and missing documents
    // This would be replaced with actual API calls
    const fetchDashboardData = async () => {
      // Mock data for now
      setTodos([
        {
          id: '1',
          userId: user?.id || '',
          title: 'Lohnsteuerbescheinigung 2023',
          description: 'Bitte laden Sie Ihre Lohnsteuerbescheinigung für 2023 hoch',
          dueDate: new Date('2024-03-31'),
          status: 'pending',
          priority: 'high',
          category: 'documents',
        },
      ]);
      setProgress(35);
    };

    fetchDashboardData();
  }, [user]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" color="primary">
            Willkommen zurück, {user?.name}
          </Typography>
          <HelpTooltip
            title="Ihr persönliches Dashboard"
            content="Hier sehen Sie Ihre wichtigsten Aufgaben und den aktuellen Status Ihrer Steuererklärung."
          />
        </Box>

        {/* Progress Bar */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                Fortschritt Ihrer Steuererklärung
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {progress}%
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          {/* What's Next Card */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Was steht an?
                </Typography>
                {todos.map((todo) => (
                  <Box key={todo.id} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                        {todo.title}
                      </Typography>
                      <Chip
                        label={todo.priority}
                        color={todo.priority === 'high' ? 'error' : 'default'}
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {todo.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Fällig am: {todo.dueDate.toLocaleDateString()}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Missing Documents Card */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Fehlende Dokumente
                </Typography>
                {missingDocs.length > 0 ? (
                  missingDocs.map((doc) => (
                    <Box key={doc.id} sx={{ mb: 2 }}>
                      <Typography variant="subtitle1">{doc.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Kategorie: {doc.category}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Alert severity="success">
                    Alle erforderlichen Dokumente sind vorhanden!
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Schnellzugriff
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Card
                      sx={{
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'translateY(-4px)' },
                      }}
                      onClick={() => navigate('/documents')}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <DocumentIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                          <Typography variant="h6">Dokumente</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          Verwalten Sie Ihre Steuerdokumente
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card
                      sx={{
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'translateY(-4px)' },
                      }}
                      onClick={() => navigate('/tax-filing')}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <ReceiptIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                          <Typography variant="h6">Steuererklärung</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          Starten Sie Ihre Steuererklärung
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card
                      sx={{
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'translateY(-4px)' },
                      }}
                      onClick={() => navigate('/appointments')}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <EventIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                          <Typography variant="h6">Termine</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          Vereinbaren Sie einen Beratungstermin
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Privacy Notice */}
        <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SecurityIcon color="action" sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Ihre Daten werden verschlüsselt übertragen und gespeichert
          </Typography>
        </Box>

        {/* Feedback Widget */}
        <FeedbackWidget section="dashboard" />
      </Box>
    </Container>
  );
};

export default Dashboard; 