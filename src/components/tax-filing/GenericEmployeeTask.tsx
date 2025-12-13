import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Alert,
  Tooltip,
  TextField,
  Button,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  HelpOutline as HelpOutlineIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

const BRAND_GREEN = '#32CE69';
const ACTIVE_BLUE = '#3B82F6';
const INACTIVE_COLOR = '#475569';

interface GenericEmployeeTaskProps {
  title: string;
  onBack: () => void;
  description?: string;
  taxInfo?: {
    title: string;
    content: string;
  };
  fields?: Array<{
    label: string;
    type: 'text' | 'number' | 'date';
    tooltip?: string;
    placeholder?: string;
  }>;
}

const GenericEmployeeTask: React.FC<GenericEmployeeTaskProps> = ({
  title,
  onBack,
  description,
  taxInfo,
  fields = [],
}) => {
  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1E293B' }}>
          {title}
        </Typography>
        <IconButton onClick={onBack} sx={{ color: INACTIVE_COLOR }}>
          <ArrowBackIcon />
        </IconButton>
      </Box>

      {/* Description */}
      {description && (
        <Typography variant="body2" sx={{ color: INACTIVE_COLOR, mb: 4, lineHeight: 1.6 }}>
          {description}
        </Typography>
      )}

      {/* Steuerlicher Hinweis */}
      {taxInfo && (
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
            {taxInfo.title}
          </Typography>
          <Typography variant="body2" sx={{ color: '#1E40AF' }}>
            {taxInfo.content}
          </Typography>
        </Alert>
      )}

      {/* Form Fields */}
      {fields.length > 0 && (
        <Box sx={{ mb: 3 }}>
          {fields.map((field, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#1E293B' }}>
                  {field.label}
                </Typography>
                {field.tooltip && (
                  <Tooltip title={field.tooltip} arrow>
                    <IconButton size="small" sx={{ color: INACTIVE_COLOR }}>
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
              <TextField
                fullWidth
                type={field.type}
                size="small"
                placeholder={field.placeholder}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#FFFFFF',
                    borderRadius: '8px',
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      )}

      {/* Info Message if no fields */}
      {fields.length === 0 && (
        <Alert
          severity="info"
          icon={<HelpOutlineIcon />}
          sx={{
            mb: 3,
            bgcolor: '#EFF6FF',
            border: '1px solid #BFDBFE',
          }}
        >
          <Typography variant="body2" sx={{ color: '#1E40AF' }}>
            Diese Funktion wird derzeit implementiert. Bitte wenden Sie sich an Ihren Steuerberater für weitere Informationen zu {title}.
          </Typography>
        </Alert>
      )}
    </Box>
  );
};

export default GenericEmployeeTask;

