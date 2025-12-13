import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  InputAdornment,
  Paper,
} from '@mui/material';
import {
  Send as SendIcon,
  Search as SearchIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const BRAND_GREEN = '#32CE69';
const INACTIVE_COLOR = '#475569';
const HOVER_BG = '#F1F5F9';

interface Conversation {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isOnline: boolean;
}

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isFromUser: boolean;
}

const conversations: Conversation[] = [
  {
    id: 'steuerberater',
    name: 'Steuerberater',
    role: 'Steuerberater',
    lastMessage: 'Willkommen im Chat!',
    timestamp: '09:00',
    unread: 0,
    isOnline: true,
  },
  {
    id: 'sachbearbeiter',
    name: 'Sachbearbeiter',
    role: 'Sachbearbeiter',
    lastMessage: 'Willkommen im Chat!',
    timestamp: '09:00',
    unread: 0,
    isOnline: false,
  },
];

const Messages: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string>('steuerberater');
  const [searchQuery, setSearchQuery] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({
    steuerberater: [
      {
        id: '1',
        text: 'Hallo, ich habe eine Frage zu meinen Unterlagen.',
        timestamp: '09:00',
        isFromUser: false,
      },
      {
        id: '2',
        text: 'Hallo Peter, wie kann ich helfen?',
        timestamp: '09:01',
        isFromUser: true,
      },
    ],
    sachbearbeiter: [],
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedConversation]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      timestamp: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
      isFromUser: true,
    };

    setMessages((prev) => ({
      ...prev,
      [selectedConversation]: [...(prev[selectedConversation] || []), newMessage],
    }));

    setInput('');
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const currentConversation = conversations.find((c) => c.id === selectedConversation);
  const currentMessages = messages[selectedConversation] || [];
  const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0);

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 24px)', gap: 0 }}>
      {/* Left Sidebar - Conversations List */}
      <Box
        sx={{
          width: 360,
          borderRight: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: '1px solid #E2E8F0' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#1E293B',
              fontSize: '18px',
              mb: 0.5,
            }}
          >
            Nachrichten
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: INACTIVE_COLOR,
              fontSize: '14px',
            }}
          >
            {totalUnread} ungelesen
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box sx={{ p: 2, borderBottom: '1px solid #E2E8F0' }}>
          <TextField
            fullWidth
            placeholder="Suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: INACTIVE_COLOR, fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#F7F8F9',
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'transparent',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'transparent',
                },
              },
            }}
          />
        </Box>

        {/* Conversations List */}
        <List sx={{ flexGrow: 1, overflow: 'auto', p: 0 }}>
          {filteredConversations.map((conversation) => {
            const isActive = selectedConversation === conversation.id;
            return (
              <ListItem key={conversation.id} disablePadding>
                <ListItemButton
                  onClick={() => setSelectedConversation(conversation.id)}
                  sx={{
                    px: 2,
                    py: 1.5,
                    mx: 1,
                    my: 0.5,
                    borderRadius: '8px',
                    backgroundColor: isActive ? BRAND_GREEN : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive ? BRAND_GREEN : HOVER_BG,
                    },
                    transition: 'background-color 0.2s ease-in-out',
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: isActive ? '#FFFFFF' : BRAND_GREEN,
                        color: isActive ? BRAND_GREEN : '#FFFFFF',
                        width: 40,
                        height: 40,
                      }}
                    >
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          color: isActive ? '#FFFFFF' : '#1E293B',
                          fontSize: '15px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {conversation.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: isActive ? '#FFFFFF' : INACTIVE_COLOR,
                          fontSize: '12px',
                          ml: 1,
                        }}
                      >
                        {conversation.timestamp}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: isActive ? '#FFFFFF' : INACTIVE_COLOR,
                        fontSize: '13px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {conversation.lastMessage}
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Right Side - Chat Area */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
        {currentConversation ? (
          <>
            {/* Chat Header */}
            <Box
              sx={{
                p: 2,
                borderBottom: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: BRAND_GREEN,
                  color: '#FFFFFF',
                  width: 40,
                  height: 40,
                }}
              >
                <PersonIcon />
              </Avatar>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: '#1E293B',
                    fontSize: '16px',
                  }}
                >
                  {currentConversation.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: currentConversation.isOnline ? BRAND_GREEN : INACTIVE_COLOR,
                    fontSize: '13px',
                  }}
                >
                  {currentConversation.isOnline ? 'Online' : 'Offline'}
                </Typography>
              </Box>
            </Box>

            {/* Messages Area */}
            <Box
              sx={{
                flexGrow: 1,
                overflow: 'auto',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}
            >
              {currentMessages.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    display: 'flex',
                    justifyContent: message.isFromUser ? 'flex-end' : 'flex-start',
                    alignItems: 'flex-start',
                    gap: 1,
                  }}
                >
                  {!message.isFromUser && (
                    <Avatar
                      sx={{
                        bgcolor: BRAND_GREEN,
                        color: '#FFFFFF',
                        width: 32,
                        height: 32,
                      }}
                    >
                      <PersonIcon sx={{ fontSize: 18 }} />
                    </Avatar>
                  )}
                  <Box
                    sx={{
                      maxWidth: '70%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0.5,
                    }}
                  >
                    <Paper
                      sx={{
                        p: 1.5,
                        backgroundColor: message.isFromUser ? BRAND_GREEN : '#F1F5F9',
                        color: message.isFromUser ? '#FFFFFF' : '#1E293B',
                        borderRadius: '12px',
                        fontSize: '14px',
                        lineHeight: 1.5,
                      }}
                    >
                      {message.text}
                    </Paper>
                    <Typography
                      variant="caption"
                      sx={{
                        color: INACTIVE_COLOR,
                        fontSize: '11px',
                        alignSelf: message.isFromUser ? 'flex-end' : 'flex-start',
                        px: 1,
                      }}
                    >
                      {message.timestamp}
                    </Typography>
                  </Box>
                  {message.isFromUser && (
                    <Avatar
                      sx={{
                        bgcolor: BRAND_GREEN,
                        color: '#FFFFFF',
                        width: 32,
                        height: 32,
                      }}
                    >
                      U
                    </Avatar>
                  )}
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Box>

            {/* Message Input */}
            <Box
              sx={{
                p: 2,
                borderTop: '1px solid #E2E8F0',
              }}
            >
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                <TextField
                  fullWidth
                  multiline
                  maxRows={4}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nachricht eingeben..."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '24px',
                      backgroundColor: '#F7F8F9',
                      '& fieldset': {
                        borderColor: 'transparent',
                      },
                      '&:hover fieldset': {
                        borderColor: 'transparent',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'transparent',
                      },
                    },
                  }}
                />
                <IconButton
                  onClick={handleSend}
                  disabled={!input.trim()}
                  sx={{
                    bgcolor: BRAND_GREEN,
                    color: '#FFFFFF',
                    width: 48,
                    height: 48,
                    '&:hover': {
                      bgcolor: '#28B85A',
                    },
                    '&.Mui-disabled': {
                      bgcolor: '#E2E8F0',
                      color: INACTIVE_COLOR,
                    },
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: INACTIVE_COLOR,
            }}
          >
            <Typography>Wählen Sie eine Konversation aus</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Messages;

