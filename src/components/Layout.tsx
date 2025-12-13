import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Description as DocumentIcon,
  Event as EventIcon,
  Receipt as ReceiptIcon,
  AccountCircle as AccountIcon,
  Logout as LogoutIcon,
  Message as MessageIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
// @ts-ignore - File name contains special characters
import profileImage from '../Photo - Félix Lick.jpeg';

const drawerWidth = 240;

// Brand green color for active state
const BRAND_GREEN = '#32CE69';
// Dark gray/slate for inactive text and icons
const INACTIVE_COLOR = '#475569';
// Light gray for hover states
const HOVER_BG = '#F1F5F9';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Dokumente', icon: <DocumentIcon />, path: '/documents' },
  { text: 'Termine', icon: <EventIcon />, path: '/appointments' },
  { text: 'Steuererklärung', icon: <ReceiptIcon />, path: '/tax-filing' },
  { text: 'Nachrichten', icon: <MessageIcon />, path: '/messages' },
];

// Helper function to get user initials
const getUserInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const Layout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const drawer = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          px: 3,
          py: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <img
          src="/taxly_logo_background_removed.png"
          alt="Taxly Logo"
          style={{
            height: '40px',
            width: 'auto',
            objectFit: 'contain',
          }}
        />
        {isMobile && (
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              color: INACTIVE_COLOR,
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      {/* Menu Items */}
      <List
        sx={{
          flexGrow: 1,
          px: 2,
          py: 1,
        }}
      >
        {menuItems.map((item) => {
          const active = isActive(item.path);
          return (
            <ListItem
              key={item.text}
              disablePadding
              sx={{
                mb: 0.5,
              }}
            >
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) {
                    setMobileOpen(false);
                  }
                }}
                sx={{
                  borderRadius: '12px',
                  py: 1.25,
                  px: 2,
                  backgroundColor: active ? BRAND_GREEN : 'transparent',
                  color: active ? '#FFFFFF' : INACTIVE_COLOR,
                  '&:hover': {
                    backgroundColor: active ? BRAND_GREEN : HOVER_BG,
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <ListItemIcon
                  sx={{
                    color: active ? '#FFFFFF' : INACTIVE_COLOR,
                    minWidth: 40,
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '15px',
                    fontWeight: active ? 600 : 500,
                    color: active ? '#FFFFFF' : INACTIVE_COLOR,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* User Block */}
      <Box>
        <Divider sx={{ borderColor: '#E2E8F0', mb: 2 }} />
        <Box
          onClick={(e) => handleProfileMenuOpen(e as React.MouseEvent<HTMLElement>)}
          sx={{
            px: 2,
            pb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            cursor: 'pointer',
            borderRadius: '8px',
            mx: 1,
            py: 1,
            '&:hover': {
              backgroundColor: HOVER_BG,
            },
            transition: 'background-color 0.2s ease-in-out',
          }}
        >
          <Avatar
            src={
              user?.name === 'Félix Lick'
                ? profileImage
                : (user as any)?.photo_url || undefined
            }
            sx={{
              width: 40,
              height: 40,
              bgcolor: BRAND_GREEN,
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            {user?.name ? getUserInitials(user.name) : <AccountIcon />}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: '#1E293B',
                fontSize: '14px',
                lineHeight: 1.4,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {user?.name || 'Benutzer'}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: INACTIVE_COLOR,
                fontSize: '12px',
                lineHeight: 1.4,
                display: 'block',
              }}
            >
              Mandant
            </Typography>
          </Box>
        </Box>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              minWidth: 200,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        >
          <MenuItem
            onClick={() => {
              navigate('/profile');
              handleProfileMenuClose();
              if (isMobile) {
                setMobileOpen(false);
              }
            }}
          >
            <ListItemIcon>
              <AccountIcon fontSize="small" />
            </ListItemIcon>
            Profil
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              handleLogout();
              handleProfileMenuClose();
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Abmelden
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: 'none',
              boxShadow: 'none',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: 'none',
              boxShadow: 'none',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout; 