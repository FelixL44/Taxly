import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Avatar,
  CircularProgress,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { ChatMessage } from '../types';

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      user_id: 'current-user', // This would come from your auth context
      message_text: input,
      is_bot: false,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Here you would typically make an API call to your chatbot service
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        user_id: 'bot',
        message_text: data.reply,
        is_bot: true,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom>
        Chat with Tax Assistant
      </Typography>
      <Paper
        sx={{
          flexGrow: 1,
          mb: 2,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <List
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            p: 2,
          }}
        >
          {messages.map((message) => (
            <ListItem
              key={message.id}
              sx={{
                flexDirection: message.is_bot ? 'row' : 'row-reverse',
                alignItems: 'flex-start',
                mb: 2,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: message.is_bot ? 'primary.main' : 'secondary.main',
                  mr: message.is_bot ? 1 : 0,
                  ml: message.is_bot ? 0 : 1,
                }}
              >
                {message.is_bot ? 'B' : 'U'}
              </Avatar>
              <Paper
                sx={{
                  p: 2,
                  maxWidth: '70%',
                  bgcolor: message.is_bot ? 'grey.100' : 'primary.light',
                  color: message.is_bot ? 'text.primary' : 'white',
                }}
              >
                <ListItemText
                  primary={message.message_text}
                  secondary={new Date(message.timestamp).toLocaleTimeString()}
                  secondaryTypographyProps={{
                    color: message.is_bot ? 'text.secondary' : 'white',
                  }}
                />
              </Paper>
            </ListItem>
          ))}
          {isLoading && (
            <ListItem sx={{ justifyContent: 'center' }}>
              <CircularProgress size={24} />
            </ListItem>
          )}
          <div ref={messagesEndRef} />
        </List>
        <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            InputProps={{
              endAdornment: (
                <IconButton
                  color="primary"
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                >
                  <SendIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default Chat; 