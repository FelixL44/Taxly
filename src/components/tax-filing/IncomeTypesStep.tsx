import React from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.neutral.light,
  transition: 'all 0.2s ease-in-out',
  padding: theme.spacing(0.5), 
  '&:hover': {
    backgroundColor: theme.palette.neutral.light,
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

interface IncomeTypesStepProps {
  selectedTypes: string[];
  onTypesChange: (types: string[]) => void;
  income: { [type: string]: number };
  onIncomeChange: (income: { [type: string]: number }) => void;
  onNext: () => void;
  onBack: () => void;
  onError: (error: string | null) => void;
}

const incomeTypes = [
  'Land- und Forstwirtschaft',
  'Gewerbebetrieb',
  'Selbstständige Arbeit',
  'Nichtselbstständige Arbeit',
  'Kapitalvermögen',
  'Vermietung & Verpachtung',
  'Sonstige Einkünfte',
];

const IncomeTypesStep: React.FC<IncomeTypesStepProps> = ({
  selectedTypes,
  onTypesChange,
  income,
  onIncomeChange,
  onNext,
  onBack,
  onError,
}) => {
  const handleTypeToggle = (type: string) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    onTypesChange(newTypes);
    if (!newTypes.includes(type)) {
      const newIncome = { ...income };
      delete newIncome[type];
      onIncomeChange(newIncome);
    }
  };

  const handleIncomeValueChange = (type: string, value: number) => {
    onIncomeChange({ ...income, [type]: value });
  };

  const handleNext = () => {
    if (selectedTypes.length === 0) {
      onError('Bitte wählen Sie mindestens eine Einkunftsart aus.');
      return;
    }
    onNext();
  };

  return (
    <Box>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Wählen Sie Ihre Einkunftsarten
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Wählen Sie alle Einkunftsarten aus, die auf Sie zutreffen.
      </Typography>

      {incomeTypes.map((type) => (
        <StyledCard key={type}>
          <CardContent>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeToggle(type)}
                  color="primary"
                />
              }
              label={
                <Typography variant="body1" color="text.primary">
                  {type}
                </Typography>
              }
            />
            {selectedTypes.includes(type) && (
              <TextField
                fullWidth
                label="Betrag (€)"
                type="number"
                variant="outlined"
                size="small"
                sx={{ mt: 2 }}
                value={income[type] || ''}
                onChange={e => handleIncomeValueChange(type, Number(e.target.value))}
              />
            )}
          </CardContent>
        </StyledCard>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={onBack}
          sx={{
            px: 3,
            py: 1.5,
            borderRadius: 2,
          }}
        >
          Zurück
        </Button>
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

export default IncomeTypesStep; 