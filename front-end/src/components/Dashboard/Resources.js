import React, { useState, useEffect, useContext } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Alert,
  CircularProgress,
  Grid,
  Chip,
  Divider
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AuthContext } from '../../Contexts/AuthContext';
import { getResources } from '../../services/api';
import { recommendResources } from '../../services/geminiService';

const Resources = () => {
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  const [aiRecommended, setAiRecommended] = useState([]);
  const [error, setError] = useState('');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'crisis', label: 'Crisis Support' },
    { id: 'therapy', label: 'Therapy' },
    { id: 'community', label: 'Community' },
    { id: 'self-help', label: 'Self-Help' }
  ];

  useEffect(() => {
    loadResources();
  }, []);

  useEffect(() => {
    filterResources();
  }, [resources, searchTerm, category]);

  const loadResources = async () => {
    setIsLoading(true);
    try {
      const res = await getResources();
      setResources(res);
      setFilteredResources(res);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filterResources = () => {
    let filtered = [...resources];
    
    if (searchTerm) {
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (category !== 'all') {
      filtered = filtered.filter(resource => resource.category === category);
    }
    
    setFilteredResources(filtered);
  };

  const handleAIRecommendations = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const recommended = await recommendResources(user.uid);
      setAiRecommended(recommended);
      setShowAIRecommendations(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Mental Health Resources
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Find helpful resources to support your mental health journey.
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            <TextField
              placeholder="Search resources..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ flexGrow: 1 }}
            />
            
            <Button
              variant="contained"
              onClick={handleAIRecommendations}
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              Get Personalized Recommendations
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {categories.map((cat) => (
              <Chip
                key={cat.id}
                label={cat.label}
                onClick={() => setCategory(cat.id)}
                color={category === cat.id ? 'primary' : 'default'}
                variant={category === cat.id ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
      
      {showAIRecommendations ? (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5">
              Recommended for You
            </Typography>
            <Button
              variant="outlined"
              onClick={() => setShowAIRecommendations(false)}
            >
              Back to All Resources
            </Button>
          </Box>
          
          {aiRecommended.length > 0 ? (
            <Grid container spacing={3}>
              {aiRecommended.map((resource, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <ResourceCard resource={resource} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Alert severity="info">
              No personalized recommendations available right now.
            </Alert>
          )}
        </Box>
      ) : (
        <Box>
          <Typography variant="h5" gutterBottom>
            {category === 'all' ? 'All Resources' : `${category} Resources`}
          </Typography>
          
          {filteredResources.length > 0 ? (
            <Grid container spacing={3}>
              {filteredResources.map((resource, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <ResourceCard resource={resource} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Alert severity="info">
              No resources found matching your criteria.
            </Alert>
          )}
        </Box>
      )}
    </Box>
  );
};

const ResourceCard = ({ resource }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {resource.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {resource.description}
        </Typography>
        <Chip 
          label={resource.category} 
          size="small" 
          sx={{ 
            mb: 2,
            textTransform: 'capitalize',
            bgcolor: `${theme.palette.primary.light}20`,
            color: theme.palette.primary.dark
          }} 
        />
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Button 
          size="small" 
          href={resource.link} 
          target="_blank" 
          rel="noopener noreferrer"
          fullWidth
        >
          Learn More
        </Button>
      </Box>
    </Card>
  );
};

export default Resources;