import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

const ACTIVE_BLUE = '#3B82F6';
const BRAND_GREEN = '#32CE69';
const INACTIVE_COLOR = '#475569';
const WARNING_ORANGE = '#F59E0B';

interface TaxDeclaration {
  id: string;
  person: string;
  refund: number;
  date: string;
  status: 'in-progress' | 'completed' | 'draft';
}

interface YearData {
  year: number;
  title: string;
  isNew?: boolean;
  declarations: TaxDeclaration[];
  hasLastChance?: boolean;
}

interface YearSelectionProps {
  onSelectYear: (year: number) => void;
  onCreateNew: (year: number) => void;
}

const YearSelection: React.FC<YearSelectionProps> = ({ onSelectYear, onCreateNew }) => {
  const [expandedYears, setExpandedYears] = useState<number[]>([2025, 2024]);
  const [menuAnchor, setMenuAnchor] = useState<{ [key: string]: HTMLElement | null }>({});

  const yearsData: YearData[] = [
    {
      year: 2025,
      title: 'Steuererklärung jetzt schon vorbereiten',
      isNew: true,
      declarations: [
        {
          id: '1',
          person: 'Félix',
          refund: 0,
          date: '13.12.25 | 18:51 Uhr',
          status: 'in-progress',
        },
      ],
    },
    {
      year: 2024,
      title: 'Steuererklärung',
      declarations: [],
    },
    {
      year: 2023,
      title: 'Steuererklärung',
      declarations: [],
    },
    {
      year: 2022,
      title: 'Steuererklärung',
      declarations: [],
    },
    {
      year: 2021,
      title: 'Steuererklärung',
      declarations: [],
      hasLastChance: true,
    },
  ];

  const handleExpand = (year: number) => {
    setExpandedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, declarationId: string) => {
    setMenuAnchor({ ...menuAnchor, [declarationId]: event.currentTarget });
  };

  const handleMenuClose = (declarationId: string) => {
    setMenuAnchor({ ...menuAnchor, [declarationId]: null });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress':
        return INACTIVE_COLOR;
      case 'completed':
        return BRAND_GREEN;
      default:
        return INACTIVE_COLOR;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'in Bearbeitung';
      case 'completed':
        return 'Abgeschlossen';
      default:
        return 'Entwurf';
    }
  };

  return (
    <Box sx={{ bgcolor: '#F7F8F9', minHeight: '100%', p: 3 }}>
      {yearsData.map((yearData) => {
        const isExpanded = expandedYears.includes(yearData.year);
        const isCurrentYear = yearData.year === 2025;

        return (
          <Accordion
            key={yearData.year}
            expanded={isExpanded}
            onChange={() => handleExpand(yearData.year)}
            sx={{
              mb: 2,
              boxShadow: 'none',
              border: '1px solid #E2E8F0',
              borderRadius: 2,
              '&:before': { display: 'none' },
              '&.Mui-expanded': { margin: '0 0 16px 0' },
            }}
          >
            <AccordionSummary
              expandIcon={
                isExpanded ? (
                  <ExpandLessIcon sx={{ color: INACTIVE_COLOR }} />
                ) : (
                  <ExpandMoreIcon sx={{ color: INACTIVE_COLOR }} />
                )
              }
              sx={{
                px: 3,
                py: 2,
                '&.Mui-expanded': { minHeight: 56 },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
                <Chip
                  label={yearData.year}
                  sx={{
                    bgcolor: ACTIVE_BLUE,
                    color: '#FFFFFF',
                    fontWeight: 600,
                    minWidth: 60,
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E293B' }}>
                  {yearData.title}
                </Typography>
                {yearData.isNew && (
                  <Chip
                    label="neu"
                    size="small"
                    sx={{
                      bgcolor: BRAND_GREEN,
                      color: '#FFFFFF',
                      fontSize: '11px',
                      height: 20,
                    }}
                  />
                )}
                {yearData.hasLastChance && (
                  <Chip
                    label="letzte Chance!"
                    size="small"
                    sx={{
                      bgcolor: WARNING_ORANGE,
                      color: '#FFFFFF',
                      fontSize: '11px',
                      height: 20,
                    }}
                  />
                )}
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 3, pb: 3 }}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {/* Existing Declarations */}
                {yearData.declarations.map((declaration) => (
                  <Card
                    key={declaration.id}
                    onClick={() => onSelectYear(yearData.year)}
                    sx={{
                      flex: '1 1 300px',
                      minWidth: 300,
                      cursor: 'pointer',
                      border: '1px solid #E2E8F0',
                      '&:hover': { boxShadow: 3 },
                      transition: 'all 0.2s',
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box>
                          <Typography variant="body2" sx={{ color: INACTIVE_COLOR, mb: 0.5 }}>
                            Erstattung
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: 600, color: BRAND_GREEN }}>
                            {declaration.refund.toLocaleString('de-DE', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}{' '}
                            €
                          </Typography>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMenuOpen(e, declaration.id);
                          }}
                          sx={{ color: INACTIVE_COLOR }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={menuAnchor[declaration.id]}
                          open={Boolean(menuAnchor[declaration.id])}
                          onClose={() => handleMenuClose(declaration.id)}
                        >
                          <MenuItem onClick={() => handleMenuClose(declaration.id)}>Bearbeiten</MenuItem>
                          <MenuItem onClick={() => handleMenuClose(declaration.id)}>Löschen</MenuItem>
                        </Menu>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 500, color: '#1E293B', mb: 1 }}>
                        {declaration.person}
                      </Typography>
                      <Typography variant="body2" sx={{ color: INACTIVE_COLOR, mb: 1 }}>
                        {declaration.date}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: getStatusColor(declaration.status),
                          fontWeight: 500,
                        }}
                      >
                        {getStatusText(declaration.status)}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}

                {/* Create New Declaration Card */}
                <Card
                  onClick={() => onCreateNew(yearData.year)}
                  sx={{
                    flex: '1 1 300px',
                    minWidth: 300,
                    cursor: 'pointer',
                    border: '2px dashed #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 200,
                    '&:hover': {
                      borderColor: ACTIVE_BLUE,
                      bgcolor: '#F7F8F9',
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        bgcolor: ACTIVE_BLUE,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      <AddIcon sx={{ color: '#FFFFFF', fontSize: 32 }} />
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: '#1E293B' }}>
                      {isCurrentYear ? 'Steuererklärung vorbereiten' : 'Steuererklärung anlegen'}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default YearSelection;

