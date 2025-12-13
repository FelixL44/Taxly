import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  TextField,
  IconButton,
  Collapse,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.neutral.light,
  '&:hover': {
    backgroundColor: theme.palette.neutral.light,
  },
}));

interface DeductionsStepProps {
  deductions: {
    homeOffice: { enabled: boolean; days: number };
    commuterAllowance: { enabled: boolean; distance: number; days: number };
    childcare: { enabled: boolean; amount: number };
    craftsmen: { enabled: boolean; amount: number };
    donations: { enabled: boolean; amount: number };
    insurance: { enabled: boolean; amount: number };
  };
  onDeductionsChange: (deductions: DeductionsStepProps['deductions']) => void;
  onNext: () => void;
  onBack: () => void;
  onError: (error: string | null) => void;
}

const DeductionsStep: React.FC<DeductionsStepProps> = ({
  deductions,
  onDeductionsChange,
  onNext,
  onBack,
  onError,
}) => {
  const [expanded, setExpanded] = useState<string[]>([]);

  const handleToggle = (section: string) => {
    setExpanded((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleDeductionToggle = (key: keyof DeductionsStepProps['deductions']) => {
    onDeductionsChange({
      ...deductions,
      [key]: { ...deductions[key], enabled: !deductions[key].enabled },
    });
  };

  const handleDeductionValueChange = (key: keyof DeductionsStepProps['deductions'], field: string, value: number) => {
    onDeductionsChange({
      ...deductions,
      [key]: { ...deductions[key], [field]: value },
    });
  };

  const handleNext = () => {
    // Validate required fields for expanded sections
    const missingFields: string[] = [];

    if (deductions.homeOffice.enabled && expanded.includes('homeOffice')) {
      if (!deductions.homeOffice.enabled) {
        missingFields.push('Home Office');
      }
    }

    if (deductions.commuterAllowance.enabled && expanded.includes('commuterAllowance')) {
      if (!deductions.commuterAllowance.enabled) {
        missingFields.push('Pendlerpauschale');
      }
    }

    if (deductions.childcare.enabled && expanded.includes('childcare')) {
      if (!deductions.childcare.enabled) {
        missingFields.push('Kinderbetreuungskosten');
      }
    }

    if (deductions.craftsmen.enabled && expanded.includes('craftsmen')) {
      if (!deductions.craftsmen.enabled) {
        missingFields.push('Handwerkerleistungen');
      }
    }

    if (deductions.donations.enabled && expanded.includes('donations')) {
      if (!deductions.donations.enabled) {
        missingFields.push('Spenden');
      }
    }

    if (deductions.insurance.enabled && expanded.includes('insurance')) {
      if (!deductions.insurance.enabled) {
        missingFields.push('Versicherungsbeiträge');
      }
    }

    if (missingFields.length > 0) {
      onError(`Bitte füllen Sie alle erforderlichen Felder aus: ${missingFields.join(', ')}`);
      return;
    }

    onNext();
  };

  return (
    <Box>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Wählen Sie Ihre Absetzungen
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Wählen Sie die Absetzungen aus, die Sie geltend machen möchten.
      </Typography>

      <StyledCard>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={deductions.homeOffice.enabled}
                  onChange={() => handleDeductionToggle('homeOffice')}
                  color="primary"
                />
              }
              label="Home Office"
            />
            <IconButton onClick={() => handleToggle('homeOffice')}>
              {expanded.includes('homeOffice') ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          <Collapse in={expanded.includes('homeOffice')}>
            <Box sx={{ mt: 2, pl: 2 }}>
              <TextField
                fullWidth
                label="Home-Office-Tage im Jahr"
                type="number"
                variant="outlined"
                size="small"
                value={deductions.homeOffice.days}
                onChange={e => handleDeductionValueChange('homeOffice', 'days', Number(e.target.value))}
              />
            </Box>
          </Collapse>
        </CardContent>
      </StyledCard>

      <StyledCard>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={deductions.commuterAllowance.enabled}
                  onChange={() => handleDeductionToggle('commuterAllowance')}
                  color="primary"
                />
              }
              label="Pendlerpauschale"
            />
            <IconButton onClick={() => handleToggle('commuterAllowance')}>
              {expanded.includes('commuterAllowance') ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          <Collapse in={expanded.includes('commuterAllowance')}>
            <Box sx={{ mt: 2, pl: 2 }}>
              <TextField
                fullWidth
                label="Entfernung in km"
                type="number"
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
                value={deductions.commuterAllowance.distance}
                onChange={e => handleDeductionValueChange('commuterAllowance', 'distance', Number(e.target.value))}
              />
              <TextField
                fullWidth
                label="Arbeitstage im Jahr"
                type="number"
                variant="outlined"
                size="small"
                value={deductions.commuterAllowance.days}
                onChange={e => handleDeductionValueChange('commuterAllowance', 'days', Number(e.target.value))}
              />
            </Box>
          </Collapse>
        </CardContent>
      </StyledCard>

      <StyledCard>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={deductions.childcare.enabled}
                  onChange={() => handleDeductionToggle('childcare')}
                  color="primary"
                />
              }
              label="Kinderbetreuungskosten"
            />
            <IconButton onClick={() => handleToggle('childcare')}>
              {expanded.includes('childcare') ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          <Collapse in={expanded.includes('childcare')}>
            <Box sx={{ mt: 2, pl: 2 }}>
              <TextField
                fullWidth
                label="Gesamtkosten"
                type="number"
                variant="outlined"
                size="small"
                value={deductions.childcare.amount}
                onChange={e => handleDeductionValueChange('childcare', 'amount', Number(e.target.value))}
              />
            </Box>
          </Collapse>
        </CardContent>
      </StyledCard>

      <StyledCard>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={deductions.craftsmen.enabled}
                  onChange={() => handleDeductionToggle('craftsmen')}
                  color="primary"
                />
              }
              label="Handwerkerleistungen"
            />
            <IconButton onClick={() => handleToggle('craftsmen')}>
              {expanded.includes('craftsmen') ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          <Collapse in={expanded.includes('craftsmen')}>
            <Box sx={{ mt: 2, pl: 2 }}>
              <TextField
                fullWidth
                label="Kosten"
                type="number"
                variant="outlined"
                size="small"
                value={deductions.craftsmen.amount}
                onChange={e => handleDeductionValueChange('craftsmen', 'amount', Number(e.target.value))}
              />
            </Box>
          </Collapse>
        </CardContent>
      </StyledCard>

      <StyledCard>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={deductions.donations.enabled}
                  onChange={() => handleDeductionToggle('donations')}
                  color="primary"
                />
              }
              label="Spenden"
            />
            <IconButton onClick={() => handleToggle('donations')}>
              {expanded.includes('donations') ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          <Collapse in={expanded.includes('donations')}>
            <Box sx={{ mt: 2, pl: 2 }}>
              <TextField
                fullWidth
                label="Betrag"
                type="number"
                variant="outlined"
                size="small"
                value={deductions.donations.amount}
                onChange={e => handleDeductionValueChange('donations', 'amount', Number(e.target.value))}
              />
            </Box>
          </Collapse>
        </CardContent>
      </StyledCard>

      <StyledCard>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={deductions.insurance.enabled}
                  onChange={() => handleDeductionToggle('insurance')}
                  color="primary"
                />
              }
              label="Versicherungsbeiträge"
            />
            <IconButton onClick={() => handleToggle('insurance')}>
              {expanded.includes('insurance') ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          <Collapse in={expanded.includes('insurance')}>
            <Box sx={{ mt: 2, pl: 2 }}>
              <TextField
                fullWidth
                label="Beitrag"
                type="number"
                variant="outlined"
                size="small"
                value={deductions.insurance.amount}
                onChange={e => handleDeductionValueChange('insurance', 'amount', Number(e.target.value))}
              />
            </Box>
          </Collapse>
        </CardContent>
      </StyledCard>

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

export default DeductionsStep; 