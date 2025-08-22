import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@mui/material';

const incomeSources = [
  { id: 'employment', label: 'Employment Income' },
  { id: 'self-employed', label: 'Self-Employment Income' },
  { id: 'rental', label: 'Rental Income' },
  { id: 'investments', label: 'Investment Income' },
  { id: 'other', label: 'Other Income' },
];

const IncomeSources = () => {
  const navigate = useNavigate();
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [otherIncome, setOtherIncome] = useState('');

  const handleSourceChange = (sourceId: string) => {
    setSelectedSources((prev) =>
      prev.includes(sourceId)
        ? prev.filter((id) => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  const handleSubmit = () => {
    // Here you would typically save the selected income sources
    console.log('Selected sources:', selectedSources);
    console.log('Other income description:', otherIncome);
    navigate('/upload');
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
            Select Income Sources
          </Typography>
          <FormGroup sx={{ width: '100%', mt: 2 }}>
            {incomeSources.map((source) => (
              <FormControlLabel
                key={source.id}
                control={
                  <Checkbox
                    checked={selectedSources.includes(source.id)}
                    onChange={() => handleSourceChange(source.id)}
                  />
                }
                label={source.label}
              />
            ))}
          </FormGroup>
          {selectedSources.includes('other') && (
            <TextField
              fullWidth
              label="Please describe other income sources"
              multiline
              rows={4}
              value={otherIncome}
              onChange={(e) => setOtherIncome(e.target.value)}
              sx={{ mt: 2 }}
            />
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleSubmit}
            disabled={selectedSources.length === 0}
          >
            Continue
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default IncomeSources; 