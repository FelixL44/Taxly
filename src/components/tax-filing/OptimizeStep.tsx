import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  IconButton,
  Button,
  Chip,
} from '@mui/material';
import {
  Error as ErrorIcon,
  Warning as WarningIcon,
  Lightbulb as LightbulbIcon,
  Close as CloseIcon,
  ArrowForward as ArrowForwardIcon,
  AutoAwesome as AutoAwesomeIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
const ACTIVE_BLUE = '#3B82F6';
const INACTIVE_COLOR = '#475569';
const ERROR_RED = '#EF4444';
const WARNING_ORANGE = '#F59E0B';

interface ErrorItem {
  id: string;
  title: string;
  description: string;
  category: string;
  onClick: () => void;
}

interface ProblemItem {
  id: string;
  title: string;
  description: string;
  category: string;
  onClick: () => void;
}

interface HintItem {
  id: string;
  title: string;
  description: string;
  category: string;
  onClick: () => void;
}

interface OptimizeStepProps {
  errors: ErrorItem[];
  problems: ProblemItem[];
  hints: HintItem[];
  onNavigateToInput: (category: string, itemId: string) => void;
  onDismiss: (type: 'error' | 'problem' | 'hint', id: string) => void;
  onBack: () => void;
}

const OptimizeStep: React.FC<OptimizeStepProps> = ({
  errors,
  problems,
  hints,
  onNavigateToInput,
  onDismiss,
}) => {
  const [dismissedItems, setDismissedItems] = useState<Set<string>>(new Set());

  const handleDismiss = (type: 'error' | 'problem' | 'hint', id: string) => {
    setDismissedItems(new Set([...dismissedItems, id]));
    onDismiss(type, id);
  };

  const visibleErrors = errors.filter((e) => !dismissedItems.has(e.id));
  const visibleProblems = problems.filter((p) => !dismissedItems.has(p.id));
  const visibleHints = hints.filter((h) => !dismissedItems.has(h.id));

  return (
    <Box sx={{ bgcolor: '#F7F8F9', minHeight: '100%', pb: 4 }}>
      <Box sx={{ px: 3, pt: 3 }}>
        {/* Title */}
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#1E293B' }}>
          Optimieren
        </Typography>

        {/* Summary Cards */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Card
            sx={{
              flex: 1,
              bgcolor: '#FEE2E2',
              border: 'none',
              boxShadow: 'none',
            }}
          >
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ErrorIcon sx={{ color: ERROR_RED, fontSize: 32 }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 600, color: ERROR_RED }}>
                  {visibleErrors.length}
                </Typography>
                <Typography variant="body2" sx={{ color: ERROR_RED }}>
                  Fehler
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card
            sx={{
              flex: 1,
              bgcolor: '#FEF3C7',
              border: 'none',
              boxShadow: 'none',
            }}
          >
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <WarningIcon sx={{ color: WARNING_ORANGE, fontSize: 32 }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 600, color: WARNING_ORANGE }}>
                  {visibleProblems.length}
                </Typography>
                <Typography variant="body2" sx={{ color: WARNING_ORANGE }}>
                  Mögliche Probleme
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card
            sx={{
              flex: 1,
              bgcolor: '#FEF9C3',
              border: 'none',
              boxShadow: 'none',
            }}
          >
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LightbulbIcon sx={{ color: '#F59E0B', fontSize: 32 }} />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 600, color: '#F59E0B' }}>
                  {visibleHints.length}
                </Typography>
                <Typography variant="body2" sx={{ color: '#F59E0B' }}>
                  Hinweise
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* KI-Risikoanalyse Section */}
        <Box
          sx={{
            bgcolor: '#FFFFFF',
            borderRadius: 2,
            p: 3,
            mb: 4,
            border: '1px solid #E2E8F0',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <AutoAwesomeIcon sx={{ color: ACTIVE_BLUE, fontSize: 24 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E293B' }}>
              KI-Risikoanalyse
            </Typography>
            <Chip
              label="NEU"
              size="small"
              sx={{
                bgcolor: ACTIVE_BLUE,
                color: '#FFFFFF',
                fontSize: '11px',
                height: 20,
                ml: 1,
              }}
            />
            <IconButton size="small" sx={{ color: INACTIVE_COLOR, ml: 'auto' }}>
              <InfoIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ color: INACTIVE_COLOR, mb: 2 }}>
            Prüfung für mehr Sicherheit vor Rückfragen vom Finanzamt
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: ACTIVE_BLUE,
              color: '#FFFFFF',
              textTransform: 'none',
              px: 3,
              '&:hover': { bgcolor: '#2563EB' },
            }}
          >
            KI-Analyse starten
          </Button>
        </Box>

        {/* Errors List */}
        {visibleErrors.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <ErrorIcon sx={{ color: ERROR_RED, fontSize: 24 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E293B' }}>
                Fehler ({visibleErrors.length})
              </Typography>
            </Box>
            <List sx={{ bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #E2E8F0' }}>
              {visibleErrors.map((error) => (
                <ListItem
                  key={error.id}
                  disablePadding
                  sx={{
                    borderBottom: '1px solid #E2E8F0',
                    '&:last-child': { borderBottom: 'none' },
                  }}
                >
                  <ListItemButton
                    onClick={() => onNavigateToInput(error.category, error.id)}
                    sx={{
                      borderLeft: `4px solid ${ERROR_RED}`,
                      py: 2,
                      px: 3,
                      '&:hover': { bgcolor: '#FEE2E2' },
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: '#1E293B', mb: 0.5 }}>
                        {error.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                        {error.description}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ArrowForwardIcon sx={{ color: INACTIVE_COLOR }} />
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDismiss('error', error.id);
                        }}
                        sx={{ color: INACTIVE_COLOR }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Problems List */}
        {visibleProblems.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <WarningIcon sx={{ color: WARNING_ORANGE, fontSize: 24 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E293B' }}>
                Mögliche Probleme ({visibleProblems.length})
              </Typography>
            </Box>
            <List sx={{ bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #E2E8F0' }}>
              {visibleProblems.map((problem) => (
                <ListItem
                  key={problem.id}
                  disablePadding
                  sx={{
                    borderBottom: '1px solid #E2E8F0',
                    '&:last-child': { borderBottom: 'none' },
                  }}
                >
                  <ListItemButton
                    onClick={() => onNavigateToInput(problem.category, problem.id)}
                    sx={{
                      borderLeft: `4px solid ${WARNING_ORANGE}`,
                      py: 2,
                      px: 3,
                      '&:hover': { bgcolor: '#FEF3C7' },
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: '#1E293B', mb: 0.5 }}>
                        {problem.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                        {problem.description}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ArrowForwardIcon sx={{ color: INACTIVE_COLOR }} />
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDismiss('problem', problem.id);
                        }}
                        sx={{ color: INACTIVE_COLOR }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Hints List */}
        {visibleHints.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <LightbulbIcon sx={{ color: '#F59E0B', fontSize: 24 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E293B' }}>
                Hinweise ({visibleHints.length})
              </Typography>
            </Box>
            <List sx={{ bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #E2E8F0' }}>
              {visibleHints.map((hint) => (
                <ListItem
                  key={hint.id}
                  disablePadding
                  sx={{
                    borderBottom: '1px solid #E2E8F0',
                    '&:last-child': { borderBottom: 'none' },
                  }}
                >
                  <ListItemButton
                    onClick={() => onNavigateToInput(hint.category, hint.id)}
                    sx={{
                      borderLeft: `4px solid ${WARNING_ORANGE}`,
                      py: 2,
                      px: 3,
                      '&:hover': { bgcolor: '#FEF9C3' },
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: '#1E293B', mb: 0.5 }}>
                        {hint.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: INACTIVE_COLOR }}>
                        {hint.description}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ArrowForwardIcon sx={{ color: INACTIVE_COLOR }} />
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDismiss('hint', hint.id);
                        }}
                        sx={{ color: INACTIVE_COLOR }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default OptimizeStep;

