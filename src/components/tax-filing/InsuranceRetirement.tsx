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

const insuranceTypes = [
  { id: 'private-liability', label: 'Privathaftpflichtversicherung', frequent: true },
  { id: 'car', label: 'Kfz-Versicherung', frequent: true },
  { id: 'accident', label: 'Unfallversicherung', frequent: true },
  { id: 'legal', label: 'Rechtsschutzversicherung', frequent: true },
  { id: 'dental', label: 'Zahnzusatzversicherung', frequent: true },
  { id: 'disability', label: 'Berufsunfähigkeitsversicherung', frequent: true },
  { id: 'trailer', label: 'Anhänger- & Wohnwagenversicherung', frequent: false },
  { id: 'travel-health', label: 'Auslandsreisekrankenversicherung', frequent: false },
  { id: 'foreign-health', label: 'Ausländische Kranken- & Pflegeversicherung', frequent: false },
  { id: 'building-liability', label: 'Bauherrenhaftpflichtversicherung', frequent: false },
  { id: 'professional-liability', label: 'Berufshaftpflichtversicherung', frequent: false },
  { id: 'professional-pension', label: 'Berufsständische Versorgungseinrichtung', frequent: false },
  { id: 'company-pension', label: 'Betriebliche Altersvorsorge', frequent: false, notDeductible: true },
];

const InsuranceRetirement: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInsurances = insuranceTypes.filter((i) =>
    i.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
          Versicherungen & Altersvorsorge
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
        Viele Versicherungen wie z. B. Haftpflicht-, Kfz-, Berufsunfähigkeits- oder Rentenversicherungen können Si{' '}
        <Typography
          component="span"
          sx={{ color: ACTIVE_BLUE, textDecoration: 'underline', cursor: 'pointer' }}
        >
          ...mehr
        </Typography>
      </Typography>

      {/* Your Insurances Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E293B', mb: 2 }}>
          Ihre Versicherungen
        </Typography>
        <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
          Sie haben bisher keine Versicherungen erfasst.
        </Typography>
      </Box>

      {/* Add Insurance Section */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E293B', mb: 2 }}>
          Versicherung hinzufügen
        </Typography>
        
        {/* Search Bar */}
        <TextField
          fullWidth
          placeholder="Versicherung"
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

        {/* Insurance Types List */}
        <List sx={{ bgcolor: '#FFFFFF', borderRadius: 2, p: 0 }}>
          {filteredInsurances.map((insurance) => (
            <ListItem key={insurance.id} disablePadding>
              <ListItemButton
                sx={{
                  borderBottom: '1px solid #E2E8F0',
                  '&:last-child': { borderBottom: 'none' },
                  py: 2,
                  '&:hover': { bgcolor: '#F7F8F9' },
                }}
              >
                <ListItemText
                  primary={insurance.label}
                  primaryTypographyProps={{ fontWeight: 500, color: '#1E293B' }}
                />
                {insurance.frequent && (
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
                {insurance.notDeductible && (
                  <Chip
                    label="nicht absetzbar"
                    size="small"
                    sx={{
                      bgcolor: ACTIVE_BLUE,
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

export default InsuranceRetirement;

