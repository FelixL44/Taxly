import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Alert,
  Tooltip,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  HelpOutline as HelpOutlineIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

const BRAND_GREEN = '#32CE69';
const ACTIVE_BLUE = '#3B82F6';
const INACTIVE_COLOR = '#475569';

const RelocationCosts: React.FC = () => {
  const [hasRelocation, setHasRelocation] = useState(false);
  const [relocationDate, setRelocationDate] = useState('');
  const [oldAddress, setOldAddress] = useState({ postalCode: '', city: '', street: '', number: '' });
  const [newAddress, setNewAddress] = useState({ postalCode: '', city: '', street: '', number: '' });
  const [distance, setDistance] = useState(0);
  const [relocationCosts, setRelocationCosts] = useState(0);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
          Umzugskosten
        </Typography>
        <IconButton sx={{ color: INACTIVE_COLOR }}>
          <ArrowBackIcon />
        </IconButton>
      </Box>

      {/* Steuerlicher Hinweis */}
      <Alert
        severity="info"
        icon={<InfoIcon />}
        sx={{
          mb: 4,
          bgcolor: '#EFF6FF',
          border: '1px solid #BFDBFE',
          '& .MuiAlert-icon': {
            color: ACTIVE_BLUE,
          },
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1E40AF', mb: 1 }}>
          Umzugskostenpauschale
        </Typography>
        <Typography variant="body2" sx={{ color: '#1E40AF' }}>
          Bei einem beruflich veranlassten Umzug können Sie die Umzugskosten als Werbungskosten absetzen. 
          Die Umzugskostenpauschale beträgt 0,30 € pro Kilometer für die Entfernung zwischen alter und neuer Arbeitsstätte. 
          Zusätzlich können Sie die tatsächlichen Umzugskosten (Möbeltransport, Verpackung, etc.) geltend machen.
        </Typography>
      </Alert>

      {/* Hat Umzug stattgefunden? */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 500, color: '#1E293B' }}>
            Hat in 2025 ein beruflich veranlasster Umzug stattgefunden?
          </Typography>
          <Tooltip
            title="Ein beruflich veranlasster Umzug liegt vor, wenn Sie aufgrund einer neuen Arbeitsstelle oder einer Versetzung umziehen müssen."
            arrow
          >
            <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
              <HelpOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <RadioGroup
          row
          value={hasRelocation ? 'yes' : 'no'}
          onChange={(e) => setHasRelocation(e.target.value === 'yes')}
        >
          <FormControlLabel
            value="yes"
            control={<Radio sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }} />}
            label="Ja"
          />
          <FormControlLabel
            value="no"
            control={<Radio sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }} />}
            label="Nein"
          />
        </RadioGroup>
      </Box>

      {hasRelocation && (
        <>
          {/* Umzugsdatum */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                Umzugsdatum
              </Typography>
              <Tooltip
                title="Geben Sie das Datum an, an dem der Umzug stattgefunden hat."
                arrow
              >
                <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                  <HelpOutlineIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <TextField
              fullWidth
              type="date"
              size="small"
              value={relocationDate}
              onChange={(e) => setRelocationDate(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#FFFFFF',
                  borderRadius: '8px',
                },
              }}
            />
          </Box>

          {/* Alte Adresse */}
          <Card sx={{ mb: 3, border: '1px solid #E2E8F0', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1E293B', mb: 2 }}>
                Alte Adresse
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                <TextField
                  label="Postleitzahl"
                  size="small"
                  value={oldAddress.postalCode}
                  onChange={(e) => setOldAddress({ ...oldAddress, postalCode: e.target.value })}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#FFFFFF',
                      borderRadius: '8px',
                    },
                  }}
                />
                <TextField
                  label="Ort"
                  size="small"
                  value={oldAddress.city}
                  onChange={(e) => setOldAddress({ ...oldAddress, city: e.target.value })}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#FFFFFF',
                      borderRadius: '8px',
                    },
                  }}
                />
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 2 }}>
                <TextField
                  label="Straße"
                  size="small"
                  value={oldAddress.street}
                  onChange={(e) => setOldAddress({ ...oldAddress, street: e.target.value })}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#FFFFFF',
                      borderRadius: '8px',
                    },
                  }}
                />
                <TextField
                  label="Nr."
                  size="small"
                  value={oldAddress.number}
                  onChange={(e) => setOldAddress({ ...oldAddress, number: e.target.value })}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#FFFFFF',
                      borderRadius: '8px',
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Neue Adresse */}
          <Card sx={{ mb: 3, border: '1px solid #E2E8F0', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1E293B', mb: 2 }}>
                Neue Adresse
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                <TextField
                  label="Postleitzahl"
                  size="small"
                  value={newAddress.postalCode}
                  onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#FFFFFF',
                      borderRadius: '8px',
                    },
                  }}
                />
                <TextField
                  label="Ort"
                  size="small"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#FFFFFF',
                      borderRadius: '8px',
                    },
                  }}
                />
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 2 }}>
                <TextField
                  label="Straße"
                  size="small"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#FFFFFF',
                      borderRadius: '8px',
                    },
                  }}
                />
                <TextField
                  label="Nr."
                  size="small"
                  value={newAddress.number}
                  onChange={(e) => setNewAddress({ ...newAddress, number: e.target.value })}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#FFFFFF',
                      borderRadius: '8px',
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Entfernung */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                Entfernung zwischen alter und neuer Arbeitsstätte
              </Typography>
              <Tooltip
                title="Die Entfernung wird für die Berechnung der Umzugskostenpauschale benötigt (0,30 € pro Kilometer)."
                arrow
              >
                <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                  <HelpOutlineIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <TextField
              type="number"
              size="small"
              value={distance}
              onChange={(e) => setDistance(parseFloat(e.target.value) || 0)}
              placeholder="0"
              sx={{
                width: 200,
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#FFFFFF',
                  borderRadius: '8px',
                },
              }}
              InputProps={{
                endAdornment: <Typography sx={{ color: INACTIVE_COLOR, mr: 1 }}>km</Typography>,
              }}
            />
            {distance > 0 && (
              <Typography variant="body2" sx={{ color: BRAND_GREEN, mt: 1, fontWeight: 500 }}>
                Umzugskostenpauschale: {(distance * 0.3).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </Typography>
            )}
          </Box>

          {/* Tatsächliche Umzugskosten */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                Tatsächliche Umzugskosten (Möbeltransport, Verpackung, etc.)
              </Typography>
              <Tooltip
                title="Geben Sie die tatsächlichen Kosten für den Umzug an (z.B. Möbeltransport, Verpackungsmaterial, etc.). Diese können zusätzlich zur Pauschale geltend gemacht werden."
                arrow
              >
                <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                  <HelpOutlineIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <TextField
              type="number"
              size="small"
              value={relocationCosts}
              onChange={(e) => setRelocationCosts(parseFloat(e.target.value) || 0)}
              placeholder="0,00"
              sx={{
                width: 200,
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#FFFFFF',
                  borderRadius: '8px',
                },
              }}
              InputProps={{
                endAdornment: <Typography sx={{ color: INACTIVE_COLOR, mr: 1 }}>€</Typography>,
              }}
            />
          </Box>

          {/* Gesamtsumme */}
          {distance > 0 && relocationCosts > 0 && (
            <Paper
              sx={{
                p: 2,
                bgcolor: '#F0FDF4',
                border: `1px solid ${BRAND_GREEN}`,
                borderRadius: 2,
              }}
            >
              <Typography variant="body2" sx={{ color: INACTIVE_COLOR, mb: 1 }}>
                Gesamte Umzugskosten
              </Typography>
              <Typography variant="h6" sx={{ color: BRAND_GREEN, fontWeight: 600 }}>
                {((distance * 0.3) + relocationCosts).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </Typography>
            </Paper>
          )}
        </>
      )}
    </Box>
  );
};

export default RelocationCosts;

