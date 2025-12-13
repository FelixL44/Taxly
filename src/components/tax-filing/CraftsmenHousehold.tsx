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
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Search as SearchIcon,
  ArrowForward as ArrowForwardIcon,
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
  { id: 'handyman', label: 'Handwerkerleistungen', frequent: true },
  { id: 'household', label: 'Haushaltshilfen', frequent: true },
];

const CraftsmenHousehold: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = services.filter((s) =>
    s.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
          Handwerker & Haushaltshilfen
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
        Kosten für Handwerkerleistungen und Haushaltshilfen können steuerlich abgesetzt werden{' '}
        <Typography
          component="span"
          sx={{ color: ACTIVE_BLUE, textDecoration: 'underline', cursor: 'pointer' }}
        >
          ...mehr
        </Typography>
      </Typography>

      {/* Your Services Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E293B', mb: 2 }}>
          Ihre Leistungen
        </Typography>
        <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
          Sie haben bisher keine Leistungen erfasst.
        </Typography>
      </Box>

      {/* Add Services Section */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E293B', mb: 2 }}>
          Leistung hinzufügen
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
                <ArrowForwardIcon sx={{ color: INACTIVE_COLOR, fontSize: 20 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default CraftsmenHousehold;

