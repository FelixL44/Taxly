import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CardActionArea,
} from '@mui/material';
import { categories } from '../../config/categories';

const CategorySelection: React.FC = () => {
  const navigate = useNavigate();
  const { year } = useParams();

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dokumente für {year}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Wählen Sie eine Kategorie aus, um die zugehörigen Dokumente zu verwalten
      </Typography>
      <Box sx={{ maxWidth: 700, mx: 'auto' }}>
        {categories.map((category, idx) => {
          const Icon = category.icon;
          return (
            <Box
              key={category.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: '#f8fafb',
                borderRadius: 3,
                boxShadow: '0 1px 6px 0 rgba(60,72,88,0.07)',
                px: 3,
                py: 2,
                minHeight: 40,
                mb: 2.5,
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 16px 0 rgba(60,72,88,0.13)',
                  bgcolor: '#f1f5f9',
                },
              }}
              onClick={() => navigate(`/documents/${year}/${category.route}`)}
            >
              <Icon sx={{ fontSize: 36, color: 'primary.main', mr: 3, flexShrink: 0 }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  {category.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {category.description}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default CategorySelection; 