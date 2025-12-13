import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  IconButton,
  Alert,
  Tooltip,
  Card,
  CardContent,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  HelpOutline as HelpOutlineIcon,
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

const ACTIVE_BLUE = '#3B82F6';
const INACTIVE_COLOR = '#475569';

interface CommuteData {
  id: string;
  fromCurrentResidence: boolean;
  workPlaceType: 'fixed' | 'collection' | 'extensive' | 'none';
  isInGermany: boolean;
  postalCode: string;
  city: string;
  street: string;
  number: string;
  distance: number;
}

const CommuteToWork: React.FC = () => {
  const [commutes, setCommutes] = useState<CommuteData[]>([
    {
      id: '1',
      fromCurrentResidence: true,
      workPlaceType: 'fixed',
      isInGermany: true,
      postalCode: '',
      city: '',
      street: '',
      number: '',
      distance: 0,
    },
  ]);
  const [distanceError, setDistanceError] = useState(false);

  const handleAddCommute = () => {
    setCommutes([
      ...commutes,
      {
        id: Date.now().toString(),
        fromCurrentResidence: true,
        workPlaceType: 'fixed',
        isInGermany: true,
        postalCode: '',
        city: '',
        street: '',
        number: '',
        distance: 0,
      },
    ]);
  };

  const handleDeleteCommute = (id: string) => {
    if (commutes.length > 1) {
      setCommutes(commutes.filter((c) => c.id !== id));
    }
  };

  const handleCommuteChange = (id: string, field: keyof CommuteData, value: any) => {
    setCommutes(
      commutes.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleConfirmDistance = (id: string) => {
    const commute = commutes.find((c) => c.id === id);
    if (!commute) return;

    // Validate address
    if (
      !commute.postalCode ||
      !commute.city ||
      !commute.street ||
      !commute.number
    ) {
      setDistanceError(true);
      return;
    }

    // Here you would typically call a distance calculation API
    // For now, we'll just clear the error
    setDistanceError(false);
    // Simulate distance calculation
    const calculatedDistance = Math.floor(Math.random() * 50) + 5;
    handleCommuteChange(id, 'distance', calculatedDistance);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
          Wege zur Arbeit
        </Typography>
        <IconButton
          onClick={() => {
            // Handle delete
          }}
          sx={{ color: INACTIVE_COLOR }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>

      {/* Info Text */}
      <Typography variant="body2" sx={{ color: INACTIVE_COLOR, mb: 4, lineHeight: 1.6 }}>
        Wenn Sie zur Arbeit fahren, können Sie für jeden Arbeitstag eine Entfernungspauschale ansetzen. Sie beträgt 0,30 € pro Kil{' '}
        <Typography
          component="span"
          sx={{ color: ACTIVE_BLUE, textDecoration: 'underline', cursor: 'pointer' }}
        >
          ...mehr
        </Typography>
      </Typography>

      {commutes.map((commute, index) => (
        <Card key={commute.id} sx={{ mb: 3, border: '1px solid #E2E8F0', borderRadius: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E293B' }}>
                {index + 1}. Arbeitsweg
              </Typography>
              <IconButton
                size="small"
                onClick={() => handleDeleteCommute(commute.id)}
                sx={{ color: INACTIVE_COLOR }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Allgemeine Angaben */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1E293B', mb: 2 }}>
                Allgemeine Angaben
              </Typography>

              {/* Startadresse */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                    Startadresse
                  </Typography>
                  <Tooltip
                    title="Die Startadresse ist der Ort, von dem aus Sie zur Arbeit fahren. Wenn Sie von Ihrem aktuellen Wohnsitz fahren, wählen Sie 'Ja'."
                    arrow
                  >
                    <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Typography variant="body2" sx={{ color: INACTIVE_COLOR, mb: 2 }}>
                  Sind Sie in 2025 vom aktuellen Wohnsitz zur Arbeit gefahren (Bossestr. 7M, 10245 Berlin)?
                </Typography>
                <RadioGroup
                  row
                  value={commute.fromCurrentResidence ? 'yes' : 'no'}
                  onChange={(e) =>
                    handleCommuteChange(commute.id, 'fromCurrentResidence', e.target.value === 'yes')
                  }
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

              {/* Arbeitsort */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                    Arbeitsort
                  </Typography>
                  <Tooltip
                    title="Der Arbeitsort ist der Ort, an dem Sie regelmäßig arbeiten. Eine feste Einrichtung ist z.B. ein Büro, eine Filiale oder eine Dienststelle."
                    arrow
                  >
                    <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Typography variant="body2" sx={{ color: INACTIVE_COLOR, mb: 2 }}>
                  Zu welchem Ort sind Sie in 2025 gefahren?
                </Typography>
                <RadioGroup
                  value={commute.workPlaceType}
                  onChange={(e) =>
                    handleCommuteChange(commute.id, 'workPlaceType', e.target.value as any)
                  }
                >
                  <FormControlLabel
                    value="fixed"
                    control={<Radio sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }} />}
                    label="Feste Einrichtung (z. B. Büro, Filiale, Dienststelle)"
                  />
                  <FormControlLabel
                    value="collection"
                    control={<Radio sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }} />}
                    label="Sammelpunkt (z.B. Fährhafen, Busdepot)"
                  />
                  <FormControlLabel
                    value="extensive"
                    control={<Radio sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }} />}
                    label="Weiträumiges Tätigkeitsgebiet (z. B. Waldgebiet)"
                  />
                  <FormControlLabel
                    value="none"
                    control={<Radio sx={{ color: ACTIVE_BLUE, '&.Mui-checked': { color: ACTIVE_BLUE } }} />}
                    label="Keiner davon"
                  />
                </RadioGroup>
              </Box>
            </Box>

            {/* Adresse des Arbeitsorts */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1E293B', mb: 2 }}>
                Adresse des Arbeitsorts
              </Typography>

              {/* Ist der Arbeitsort in Deutschland? */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                    Ist der Arbeitsort in Deutschland?
                  </Typography>
                  <Tooltip
                    title="Wenn Ihr Arbeitsort außerhalb Deutschlands liegt, gelten andere Regelungen für die Entfernungspauschale."
                    arrow
                  >
                    <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <RadioGroup
                  row
                  value={commute.isInGermany ? 'yes' : 'no'}
                  onChange={(e) =>
                    handleCommuteChange(commute.id, 'isInGermany', e.target.value === 'yes')
                  }
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

              {/* Address Fields */}
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#1E293B' }}>
                      Postleitzahl
                    </Typography>
                    <Tooltip
                      title="Geben Sie die Postleitzahl des Arbeitsorts ein. Diese wird für die Entfernungsberechnung benötigt."
                      arrow
                    >
                      <IconButton size="small" sx={{ color: INACTIVE_COLOR, p: 0.5 }}>
                        <HelpOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <TextField
                    fullWidth
                    size="small"
                    value={commute.postalCode}
                    onChange={(e) => handleCommuteChange(commute.id, 'postalCode', e.target.value)}
                    placeholder="z.B. 10115"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: '#FFFFFF',
                        borderRadius: '8px',
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#1E293B' }}>
                      Ort
                    </Typography>
                    <Tooltip
                      title="Geben Sie den Ort (Stadt) des Arbeitsorts ein."
                      arrow
                    >
                      <IconButton size="small" sx={{ color: INACTIVE_COLOR, p: 0.5 }}>
                        <HelpOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <TextField
                    fullWidth
                    size="small"
                    value={commute.city}
                    onChange={(e) => handleCommuteChange(commute.id, 'city', e.target.value)}
                    placeholder="z.B. Berlin"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: '#FFFFFF',
                        borderRadius: '8px',
                      },
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 2 }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#1E293B' }}>
                      Straße
                    </Typography>
                    <Tooltip
                      title="Geben Sie die Straße des Arbeitsorts ein."
                      arrow
                    >
                      <IconButton size="small" sx={{ color: INACTIVE_COLOR, p: 0.5 }}>
                        <HelpOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <TextField
                    fullWidth
                    size="small"
                    value={commute.street}
                    onChange={(e) => handleCommuteChange(commute.id, 'street', e.target.value)}
                    placeholder="z.B. Hauptstraße"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: '#FFFFFF',
                        borderRadius: '8px',
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#1E293B' }}>
                      Nr.
                    </Typography>
                    <Tooltip
                      title="Geben Sie die Hausnummer des Arbeitsorts ein."
                      arrow
                    >
                      <IconButton size="small" sx={{ color: INACTIVE_COLOR, p: 0.5 }}>
                        <HelpOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <TextField
                    fullWidth
                    size="small"
                    value={commute.number}
                    onChange={(e) => handleCommuteChange(commute.id, 'number', e.target.value)}
                    placeholder="z.B. 42"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: '#FFFFFF',
                        borderRadius: '8px',
                      },
                    }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Entfernung */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1E293B', mb: 2 }}>
                Entfernung
              </Typography>

              {/* Map Placeholder with Error */}
              <Box
                sx={{
                  position: 'relative',
                  height: 200,
                  bgcolor: '#F7F8F9',
                  borderRadius: 2,
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #E2E8F0',
                }}
              >
                {distanceError && (
                  <Alert
                    severity="error"
                    icon={<CheckCircleIcon />}
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      right: 16,
                      bgcolor: '#FFFFFF',
                      '& .MuiAlert-message': {
                        color: '#DC2626',
                        fontSize: '13px',
                      },
                    }}
                  >
                    Die Entfernungsberechnung war leider nicht erfolgreich. Möglicherweise sind die Angaben zur Start- und Zieladresse nicht vollständig. Bitte prüfen Sie Ihre Angaben.
                  </Alert>
                )}
                <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                  Karte zur Entfernungsberechnung
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                  Entfernung zur Arbeit (nur Hinweg)
                </Typography>
                <Tooltip
                  title="Die Entfernung wird automatisch berechnet, sobald Start- und Zieladresse vollständig sind. Sie können die Entfernung auch manuell eingeben."
                  arrow
                >
                  <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                    <HelpOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <TextField
                  size="small"
                  value={commute.distance}
                  onChange={(e) => handleCommuteChange(commute.id, 'distance', parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  sx={{
                    width: 150,
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#FFFFFF',
                      borderRadius: '8px',
                    },
                  }}
                  InputProps={{
                    endAdornment: <Typography sx={{ color: INACTIVE_COLOR, mr: 1 }}>km</Typography>,
                  }}
                />
                <Button
                  variant="contained"
                  onClick={() => handleConfirmDistance(commute.id)}
                  sx={{
                    bgcolor: ACTIVE_BLUE,
                    color: '#FFFFFF',
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#2563EB' },
                  }}
                >
                  bestätigen
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}

      {/* Add Another Commute Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddCommute}
          sx={{
            borderColor: ACTIVE_BLUE,
            color: ACTIVE_BLUE,
            textTransform: 'none',
            px: 3,
            '&:hover': {
              borderColor: '#2563EB',
              bgcolor: '#EFF6FF',
            },
          }}
        >
          weiteren Arbeitsweg hinzufügen
        </Button>
      </Box>
    </Box>
  );
};

export default CommuteToWork;

