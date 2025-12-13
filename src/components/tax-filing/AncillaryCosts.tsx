import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Chip,
  Paper,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Search as SearchIcon,
  ArrowForward as ArrowForwardIcon,
  CameraAlt as CameraIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const BRAND_GREEN = '#32CE69';
const ACTIVE_BLUE = '#3B82F6';
const INACTIVE_COLOR = '#475569';

const services = [
  { id: 'garden', label: 'Gartenpflege', frequent: true },
  { id: 'cleaning', label: 'Gebäudereinigung', frequent: true },
  { id: 'caretaker', label: 'Hausmeister', frequent: true },
  { id: 'heating', label: 'Heizungswartung', frequent: true },
  { id: 'chimney', label: 'Schornsteinfeger', frequent: true },
  { id: 'detectors', label: 'Wartung von Feuer- / Rauchmeldern', frequent: true },
  { id: 'maintenance', label: 'Wartungsarbeiten', frequent: true },
  { id: 'winter', label: 'Winterdienst', frequent: true },
  { id: 'waste', label: 'Abfallgebühren', frequent: false, exception: true },
  { id: 'flooring', label: 'Arbeiten an Bodenbelägen', frequent: false },
];

const AncillaryCosts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = services.filter((s) =>
    s.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
          Nebenkosten & Hausgeld
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
        Mieter erhalten einmal im Jahr eine Nebenkostenabrechnung von ihrem Vermieter und Wohnungseigentümer eine{' '}
        <Typography
          component="span"
          sx={{ color: ACTIVE_BLUE, textDecoration: 'underline', cursor: 'pointer' }}
        >
          ...mehr
        </Typography>
      </Typography>

      {/* Tab Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: ACTIVE_BLUE,
            textDecoration: 'underline',
          }}
        >
          1. Abrechnung
        </Typography>
        <IconButton
          sx={{
            bgcolor: ACTIVE_BLUE,
            color: '#FFFFFF',
            '&:hover': { bgcolor: '#2563EB' },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {/* Take Photo Section */}
      <Paper
        sx={{
          bgcolor: '#EFF6FF',
          borderRadius: 2,
          p: 3,
          mb: 4,
          border: '1px solid #BFDBFE',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: ACTIVE_BLUE, mb: 1 }}>
              Jetzt Foto aufnehmen
            </Typography>
            <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
              Einfach Dokument mit dem Smartphone abfotografieren oder direkt vom PC hochladen und erfahren, was Sie absetzen können.
            </Typography>
          </Box>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: '#DBEAFE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CameraIcon sx={{ fontSize: 40, color: ACTIVE_BLUE }} />
          </Box>
        </Box>
      </Paper>

      {/* Your Deductible Services Section */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E293B', mb: 2 }}>
          Ihre absetzbaren Leistungen
        </Typography>
        
        {/* Search Bar */}
        <TextField
          fullWidth
          placeholder="Leistungen"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: INACTIVE_COLOR }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              bgcolor: '#FFFFFF',
              borderRadius: '8px',
            },
          }}
        />

        {/* Services List */}
        <List sx={{ bgcolor: '#FFFFFF', borderRadius: 2, p: 0 }}>
          {filteredServices.map((service) => (
            <ListItem key={service.id} disablePadding>
              <ListItemButton
                sx={{
                  borderBottom: '1px solid #E2E8F0',
                  '&:last-child': { borderBottom: 'none' },
                  py: 2,
                  '&:hover': { bgcolor: '#F7F8F9' },
                }}
              >
                <ListItemText
                  primary={service.label}
                  primaryTypographyProps={{ fontWeight: 500, color: '#1E293B' }}
                />
                {service.frequent && (
                  <Chip
                    label="häufig"
                    size="small"
                    sx={{
                      bgcolor: BRAND_GREEN,
                      color: '#FFFFFF',
                      fontSize: '11px',
                      height: 20,
                      mr: 1,
                    }}
                  />
                )}
                {service.exception && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: ACTIVE_BLUE,
                      fontSize: '11px',
                      mr: 1,
                    }}
                  >
                    nur Ausnahmefälle
                  </Typography>
                )}
                <ArrowForwardIcon sx={{ color: INACTIVE_COLOR, fontSize: 20 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default AncillaryCosts;

