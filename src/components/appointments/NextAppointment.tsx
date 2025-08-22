import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Link,
  CircularProgress,
  Stack
} from '@mui/material';
import {
  Event as EventIcon,
  VideoCall as VideoCallIcon,
  AccessTime as AccessTimeIcon
} from '@mui/icons-material';

interface Appointment {
  id: number;
  date: string;
  title: string;
  link?: string;
}

interface NextAppointmentProps {
  next: Appointment | null;
}

const formatCountdown = (date: Date): string => {
  const now = new Date();
  const diff = date.getTime() - now.getTime();

  if (diff <= 0) return 'Termin beginnt jetzt';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return `in ${days} Tag${days !== 1 ? 'en' : ''}`;
};

export default function NextAppointment({ next }: NextAppointmentProps) {
  const [countdown, setCountdown] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!next) {
      setLoading(false);
      return;
    }

    const updateCountdown = () => {
      setCountdown(formatCountdown(new Date(next.date)));
    };

    // Initial update
    updateCountdown();
    setLoading(false);

    // Update every day at midnight
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const interval = setInterval(updateCountdown, 24 * 60 * 60 * 1000); // Update daily
    const initialTimeout = setTimeout(() => {
      updateCountdown();
      setInterval(updateCountdown, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [next]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (!next) {
    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" color="text.secondary" align="center">
            Keine anstehenden Termine
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const appointmentDate = new Date(next.date);

  return (
    <Card 
      sx={{ 
        mb: 3,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3
        }
      }}
    >
      <CardContent sx={{ position: 'relative', pb: 8 }}>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EventIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" component="h2">
              Nächster Termin
            </Typography>
          </Box>

          <Typography variant="h5">
            {next.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body1">
              {appointmentDate.toLocaleDateString('de-DE', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Typography>
          </Box>

          <Chip
            icon={<AccessTimeIcon />}
            label={countdown}
            color="primary"
            sx={{ 
              alignSelf: 'flex-start',
              '& .MuiChip-label': {
                fontWeight: 500
              }
            }}
          />
        </Stack>

        {next.link && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              right: 16,
            }}
          >
            <Button
              variant="contained"
              startIcon={<VideoCallIcon />}
              component={Link}
              href={next.link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 500,
                px: 3,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              Zugang zum Termin
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
} 