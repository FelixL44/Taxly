import React from 'react';
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

interface YearStepProps {
  year: number;
  onYearChange: (year: number) => void;
  onNext: () => void;
  onError: (error: string | null) => void;
}

const YearStep: React.FC<YearStepProps> = ({
  year,
  onYearChange,
  onNext,
  onError,
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, i) => currentYear - i);

  const handleNext = () => {
    if (!year) {
      onError('Bitte wählen Sie ein Steuerjahr aus.');
      return;
    }
    onNext();
  };

  return (
    <Box>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Wählen Sie das Steuerjahr
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Wählen Sie das Jahr aus, für das Sie die Steuererklärung abgeben möchten.
      </Typography>

      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel>Steuerjahr</InputLabel>
        <Select
          value={year}
          label="Steuerjahr"
          onChange={(e) => onYearChange(e.target.value as number)}
        >
          {years.map((y) => (
            <MenuItem key={y} value={y}>
              {y}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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

export default YearStep; 