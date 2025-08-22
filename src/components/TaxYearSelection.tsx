import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const TaxYearSelection = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const handleYearSelect = (event: any) => {
    // Here you would typically save the selected year to your state management
    console.log('Selected year:', event.target.value);
    navigate('/income-sources');
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5" gutterBottom>
            Select Tax Year
          </Typography>
          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel id="tax-year-label">Tax Year</InputLabel>
            <Select
              labelId="tax-year-label"
              id="tax-year"
              label="Tax Year"
              onChange={handleYearSelect}
              defaultValue=""
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={() => navigate('/income-sources')}
          >
            Continue
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default TaxYearSelection; 