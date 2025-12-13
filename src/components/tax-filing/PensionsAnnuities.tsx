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

const pensionTypes = [
  { id: 'statutory', label: 'Gesetzliche Rente', description: 'Deutsche Rentenversicherung', frequent: true },
  { id: 'private', label: 'Private Rente', description: 'aus einer Rentenversicherung', frequent: true },
  { id: 'retirement-contracts', label: 'Altersvorsorgeverträge', description: 'z.B. Riester, betriebl. Altersvorsorge', frequent: true },
  { id: 'professional', label: 'Berufsständische Versorgungseinrichtungen', description: 'z.B. für Ärzte, Ingenieure', frequent: false },
  { id: 'agricultural', label: 'Landwirtschaftliche Alterskassen', description: '', frequent: false },
  { id: 'company', label: 'Pension / Betriebsrente', description: '', frequent: false, tag: 'Lohnsteuer' },
  { id: 'certified', label: 'Zertifizierte Basisrentenverträge', description: 'Rürup-Rente', frequent: false },
  { id: 'other', label: 'Sonstige Rente', description: 'z.B. private Veräußerungsrente', frequent: false },
];

const PensionsAnnuities: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPensions = pensionTypes.filter((p) =>
    p.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
          Renten & Pensionen
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
        Zu den erhaltenen Renten & Pensionen gehören insbesondere folgende Renten:{' '}
        <Typography
          component="span"
          sx={{ color: ACTIVE_BLUE, textDecoration: 'underline', cursor: 'pointer' }}
        >
          ...mehr
        </Typography>
      </Typography>

      {/* Your Pensions Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E293B', mb: 2 }}>
          Ihre Renten & Pensionen
        </Typography>
        <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
          Sie haben bisher keine Renten & Pensionen erfasst.
        </Typography>
      </Box>

      {/* Add Pensions Section */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E293B', mb: 2 }}>
          Renten & Pensionen hinzufügen
        </Typography>
        
        {/* Search Bar */}
        <TextField
          fullWidth
          placeholder="Renten & Pensionen"
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

        {/* Pension Types List */}
        <List sx={{ bgcolor: '#FFFFFF', borderRadius: 2, p: 0 }}>
          {filteredPensions.map((pension) => (
            <ListItem key={pension.id} disablePadding>
              <ListItemButton
                sx={{
                  borderBottom: '1px solid #E2E8F0',
                  '&:last-child': { borderBottom: 'none' },
                  py: 2,
                  '&:hover': { bgcolor: '#F7F8F9' },
                }}
              >
                <ListItemText
                  primary={pension.label}
                  secondary={pension.description}
                  primaryTypographyProps={{ fontWeight: 500, color: '#1E293B' }}
                  secondaryTypographyProps={{ color: INACTIVE_COLOR, fontSize: '13px' }}
                />
                {pension.frequent && (
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
                {pension.tag && (
                  <Chip
                    label={pension.tag}
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

export default PensionsAnnuities;

