import React, { useState } from 'react';
import {
  Box,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  IconButton,
  Alert,
} from '@mui/material';
import {
  Chat as ChatIcon,
  Send as SendIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { FeedbackMessage } from '../types';

interface FeedbackWidgetProps {
  section: string;
}

const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({ section }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<FeedbackMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setError(null);
    try {
      // This would be replaced with an actual API call
      const newMessage: FeedbackMessage = {
        id: Date.now().toString(),
        userId: user?.id || '',
        section,
        message: message.trim(),
        timestamp: new Date(),
        status: 'pending',
      };

      setMessages([...messages, newMessage]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Fab
        color="primary"
        size="medium"
        onClick={() => setOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
        }}
      >
        <ChatIcon />
      </Fab>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            height: '80vh',
            maxHeight: 600,
          },
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Feedback & Support</Typography>
            <IconButton onClick={() => setOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <List sx={{ mb: 2 }}>
            {messages.map((msg) => (
              <React.Fragment key={msg.id}>
                <ListItem>
                  <ListItemText
                    primary={msg.message}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {user?.name}
                        </Typography>
                        {' — '}
                        {new Date(msg.timestamp).toLocaleString()}
                      </>
                    }
                  />
                </ListItem>
                {msg.response && (
                  <ListItem sx={{ bgcolor: 'action.hover' }}>
                    <ListItemText
                      primary={msg.response}
                      secondary="Steuerberater"
                    />
                  </ListItem>
                )}
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </DialogContent>

        <DialogActions sx={{ p: 2, pt: 0 }}>
          <TextField
            fullWidth
            multiline
            rows={2}
            placeholder="Ihre Nachricht..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
            sx={{ mb: 2 }}
            error={!!error}
            helperText={error}
          />
          <Button
            variant="contained"
            endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
            onClick={handleSubmit}
            disabled={loading || !message.trim()}
          >
            Senden
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FeedbackWidget; 