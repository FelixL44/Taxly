import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  PhotoCamera as PhotoCameraIcon,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useAuthStore } from '../store/authStore';

const Profile = () => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address || '',
    profession: user?.profession || '',
    phone: user?.phone || '',
  });

  // Neue Chartdaten laut Userwunsch, gestapelt
  const chartData = [
    { year: 2020, total: 13256, zurueckgeholt: 2400 },
    { year: 2021, total: 12579, zurueckgeholt: 1697 },
    { year: 2022, total: 15689, zurueckgeholt: 2451 },
    { year: 2023, total: 18235, zurueckgeholt: 4156 },
  ].map(row => ({
    year: row.year,
    kapital: Math.round(row.total * 0.15),
    vermietung: Math.round(row.total * 0.20),
    arbeit: row.total - Math.round(row.total * 0.15) - Math.round(row.total * 0.20),
    zurueckgeholt: row.zurueckgeholt,
  }));
  const totalPaid = chartData.reduce((sum, y) => sum + y.kapital + y.vermietung + y.arbeit, 0);
  const totalRecovered = chartData.reduce((sum, y) => sum + y.zurueckgeholt, 0);
  const avgPaid = Math.round(totalPaid / chartData.length);
  const avgRecovered = Math.round(totalRecovered / chartData.length);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Here you would typically make an API call to update the user's profile
      console.log('Saving profile:', formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Here you would typically upload the photo to S3
      console.log('Uploading photo:', file);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="photo-upload"
              type="file"
              onChange={handlePhotoUpload}
            />
            <label htmlFor="photo-upload">
              <IconButton
                component="span"
                sx={{
                  position: 'relative',
                  '&:hover .photo-overlay': {
                    opacity: 1,
                  },
                }}
              >
                <Avatar
                  src={"/src/Photo - Félix Lick.jpeg"}
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <Box
                  className="photo-overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                  }}
                >
                  <PhotoCameraIcon sx={{ color: 'white' }} />
                </Box>
              </IconButton>
            </label>
            <Typography variant="h6" gutterBottom>
              {user?.name}
            </Typography>
            <Typography color="textSecondary">{user?.email}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Personal Information</Typography>
              <IconButton onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? <CancelIcon /> : <EditIcon />}
              </IconButton>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Profession"
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Grid>
            </Grid>
            {isEditing && (
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                sx={{ mt: 2 }}
              >
                Save Changes
              </Button>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Financial Status
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'stretch' }}>
              {/* KPIs */}
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', gap: 3, mb: 0 }}>
                  <Card sx={{ bgcolor: '#f8fafb', flex: 1 }}>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Abgeführte Steuern (Total)
                      </Typography>
                      <Typography variant="h4" color="text.primary">
                        {totalPaid.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card sx={{ bgcolor: '#f8fafb', flex: 1 }}>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Ø Steuerlast
                      </Typography>
                      <Typography variant="h4" color="text.primary">
                        {avgPaid.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
                <Box sx={{ display: 'flex', gap: 3, mb: 0 }}>
                  <Card sx={{ bgcolor: '#f8fafb', flex: 1 }}>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Steuerrückzahlungen (Total)
                      </Typography>
                      <Typography variant="h4" color="success.main">
                        {totalRecovered.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card sx={{ bgcolor: '#f8fafb', flex: 1 }}>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Ø Rückzahlungen
                      </Typography>
                      <Typography variant="h4" color="success.main">
                        {avgRecovered.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
              {/* Chart */}
              <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Steuerlast nach Jahr
                </Typography>
                <Box sx={{ height: 320, width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barCategoryGap={32} barGap={8}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip
                        formatter={(value: number, name: string) => {
                          const formatted = value.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' €';
                          if (name === 'kapital') return [formatted, 'Kapitalerträge (15%)'];
                          if (name === 'vermietung') return [formatted, 'Vermietung & Verpachtung (20%)'];
                          if (name === 'arbeit') return [formatted, 'Nichtselbstständige Arbeit (65%)'];
                          if (name === 'zurueckgeholt') return [formatted, 'Zurückgeholt'];
                          return value;
                        }}
                      />
                      <Bar dataKey="kapital" stackId="abgefuehrt" fill="#4CAF50" name="Kapitalerträge (15%)" barSize={24} />
                      <Bar dataKey="vermietung" stackId="abgefuehrt" fill="#1976D2" name="Vermietung & Verpachtung (20%)" barSize={24} />
                      <Bar dataKey="arbeit" stackId="abgefuehrt" fill="#FBC330" name="Nichtselbstständige Arbeit (65%)" barSize={24} />
                      <Bar dataKey="zurueckgeholt" fill="#306E32" name="Zurückgeholt" barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile; 