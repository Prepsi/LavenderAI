import React, { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActionArea,
  Avatar
} from '@mui/material';
import { 
  Mood as MoodIcon, 
  Book as JournalIcon, 
  People as CommunityIcon, 
  LocalHospital as ResourcesIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const features = [
    {
      title: 'Mood Tracker',
      description: 'Track your daily mood and identify patterns',
      icon: <MoodIcon fontSize="large" />,
      path: '/mood-tracker',
      color: theme.palette.primary.main
    },
    {
      title: 'Journal',
      description: 'Express your thoughts with guided journaling',
      icon: <JournalIcon fontSize="large" />,
      path: '/journal',
      color: theme.palette.secondary.main
    },
    {
      title: 'Community',
      description: 'Connect with others in a safe space',
      icon: <CommunityIcon fontSize="large" />,
      path: '/community',
      color: theme.palette.success.main
    },
    {
      title: 'Resources',
      description: 'Find helpful mental health resources',
      icon: <ResourcesIcon fontSize="large" />,
      path: '/resources',
      color: theme.palette.warning.main
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome back, {user?.displayName || 'Friend'}!
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        How would you like to focus on your mental health today?
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                borderLeft: `4px solid ${feature.color}`
              }}
            >
              <CardActionArea 
                onClick={() => navigate(feature.path)} 
                sx={{ flexGrow: 1, p: 2 }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Avatar sx={{ 
                    bgcolor: `${feature.color}20`, 
                    color: feature.color,
                    width: 56, 
                    height: 56,
                    mb: 2,
                    mx: 'auto'
                  }}>
                    {feature.icon}
                  </Avatar>
                  <Typography gutterBottom variant="h5" component="div">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;