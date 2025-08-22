import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Box,
  Divider
} from '@mui/material';
import {
  Event as EventIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Appointment {
  id: number;
  date: string;
  title: string;
}

interface PastAppointmentsProps {
  past: Appointment[];
}

export default function PastAppointments({ past }: PastAppointmentsProps) {
  const navigate = useNavigate();

  if (!past || past.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" color="text.secondary" align="center">
            Keine vergangenen Termine
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <EventIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" component="h2">
            Vergangene Termine
          </Typography>
        </Box>

        <List>
          {past.map((appointment, index) => {
            const date = new Date(appointment.date);
            return (
              <Box key={appointment.id}>
                <ListItem
                  secondaryAction={
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<InfoIcon />}
                      onClick={() => navigate(`/appointments/${appointment.id}`)}
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 500,
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 2
                        },
                        transition: 'all 0.2s ease-in-out'
                      }}
                    >
                      Details
                    </Button>
                  }
                >
                  <ListItemIcon>
                    <EventIcon color="action" />
                  </ListItemIcon>
                  <ListItemText
                    primary={appointment.title}
                    secondary={date.toLocaleDateString('de-DE', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                    primaryTypographyProps={{
                      fontWeight: 500
                    }}
                    secondaryTypographyProps={{
                      color: 'text.secondary'
                    }}
                  />
                </ListItem>
                {index < past.length - 1 && <Divider />}
              </Box>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
} 