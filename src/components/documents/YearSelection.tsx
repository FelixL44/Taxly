import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button
} from '@mui/material';

const YearSelection: React.FC = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dokumente verwalten
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Wählen Sie ein Jahr aus, um die zugehörigen Dokumente anzuzeigen
      </Typography>
      <Grid container spacing={3}>
        {years.map(year => (
          <Grid item xs={12} sm={6} md={4} key={year}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  bgcolor: 'action.hover'
                }
              }}
              onClick={() => navigate(`/documents/${year}`)}
            >
              <CardContent>
                <Typography variant="h4" component="h2" align="center" gutterBottom>
                  {year}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Dokumente für {year}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default YearSelection; 