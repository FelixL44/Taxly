import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
} from '@mui/icons-material';
import axios from 'axios';
import NextAppointment from './appointments/NextAppointment';
import PastAppointments from './appointments/PastAppointments';

interface Appointment {
  id: number;
  date: string;
  title: string;
  link?: string;
}

interface AppointmentsResponse {
  next: Appointment | null;
  past: Appointment[];
}

// Example data for empty states
const exampleNextAppointment: Appointment = {
  id: 1,
  date: '2025-07-13T13:30:00Z',
  title: 'Erstgespräch mit Frau Ajdini',
  link: '#'
};

const examplePastAppointments: Appointment[] = [
  {
    id: 2,
    date: '2025-03-15T10:00:00Z',
    title: 'Vorauszahlung Erläuterung'
  },
  {
    id: 3,
    date: '2024-12-10T09:30:00Z',
    title: 'Jahresabschluss-Review'
  }
];

const Appointments = () => {
  const [data, setData] = useState<AppointmentsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get<AppointmentsResponse>('/api/appointments');
        // Ensure response data has the expected structure
        const responseData = response.data || {};
        setData({
          next: responseData.next || null,
          past: Array.isArray(responseData.past) ? responseData.past : []
        });
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Termine konnten nicht geladen werden. Bitte versuchen Sie es später erneut.');
        // Set example data on error
        setData({
          next: exampleNextAppointment,
          past: examplePastAppointments
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleBookingClick = () => {
    // TODO: Implement booking dialog
    console.log('Booking clicked');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  // Get appointments data with fallbacks
  const nextAppointment = data?.next || exampleNextAppointment;
  const pastAppointments = Array.isArray(data?.past) ? data.past : examplePastAppointments;

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Termine
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Verwalten Sie Ihre Beratungstermine
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleBookingClick}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: 2,
              boxShadow: 2,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 3,
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            Termin buchen
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        <NextAppointment next={nextAppointment} />
        <PastAppointments past={pastAppointments} />
      </Box>
    </Container>
  );
};

export default Appointments; 