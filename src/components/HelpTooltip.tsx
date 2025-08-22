import React, { useState } from 'react';
import { Tooltip, IconButton, Box, Typography } from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';

interface HelpTooltipProps {
  title: string;
  content: string;
}

const HelpTooltip: React.FC<HelpTooltipProps> = ({ title, content }) => {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      title={
        <Box sx={{ p: 1, maxWidth: 300 }}>
          <Typography variant="subtitle2" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2">
            {content}
          </Typography>
        </Box>
      }
      arrow
      placement="bottom"
    >
      <IconButton
        size="small"
        onClick={() => setOpen(!open)}
        sx={{ color: 'primary.main' }}
      >
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
};

export default HelpTooltip; 