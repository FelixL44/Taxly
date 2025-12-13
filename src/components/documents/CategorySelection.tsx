import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CardActionArea,
  Chip,
} from '@mui/material';
import { categories } from '../../config/categories';

// Mock data for document counts - in real app, this would come from API
const documentCounts: { [key: string]: number } = {
  payslips: 12,
  receipts: 8,
  contracts: 3,
  'bank-statements': 24,
  insurance: 5,
  other: 2,
};

const CategorySelection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: '#1E293B', mb: 1 }}>
        Dokumente
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Wählen Sie eine Kategorie aus, um die zugehörigen Dokumente zu verwalten
      </Typography>
      <Grid container spacing={3}>
        {categories.map((category) => {
          const Icon = category.icon;
          const count = documentCounts[category.id] || 0;
          return (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  border: '1px solid #E2E8F0',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  },
                }}
                onClick={() => navigate(`/documents/${category.route}`)}
              >
                <CardActionArea sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          bgcolor: '#F7F8F9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                        }}
                      >
                        <Icon sx={{ fontSize: 32, color: '#3B82F6' }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E293B', mb: 0.5 }}>
                          {category.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                          {category.description}
                        </Typography>
                        <Chip
                          label={`${count} Dokument${count !== 1 ? 'e' : ''}`}
                          size="small"
                          sx={{
                            bgcolor: '#32CE69',
                            color: '#FFFFFF',
                            fontWeight: 500,
                            fontSize: '12px',
                          }}
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CategorySelection; 