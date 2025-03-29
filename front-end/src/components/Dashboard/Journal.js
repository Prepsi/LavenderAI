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
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AuthContext } from '../../Contexts/AuthContext';
import { saveJournalEntry, getJournalEntries } from '../../services/api';
import { generateJournalPrompt } from '../../services/geminiService';
import { format } from 'date-fns';

const Journal = () => {
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      loadEntries();
    }
  }, [user]);

  const loadEntries = async () => {
    try {
      const loadedEntries = await getJournalEntries(user.uid);
      setEntries(loadedEntries);
    } catch (error) {
      console.error("Error loading entries:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!entry.trim()) {
      setError('Please write something before submitting');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await saveJournalEntry(user.uid, {
        content: entry,
        timestamp: new Date().toISOString()
      });
      setEntry('');
      await loadEntries();
      setSuccess('Journal entry saved successfully!');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePrompt = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const aiPrompt = await generateJournalPrompt(user.uid);
      setPrompt(aiPrompt);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Journal
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Express your thoughts and reflect on your experiences.
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}
      
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">
              New Entry
            </Typography>
            <Button
              variant="outlined"
              onClick={generatePrompt}
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              Get Writing Prompt
            </Button>
          </Box>
          
          {prompt && (
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Writing Prompt:
              </Typography>
              {prompt}
            </Alert>
          )}
          
          <TextField
            fullWidth
            multiline
            rows={8}
            label="Write your thoughts here..."
            variant="outlined"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={!entry.trim() || isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isLoading ? 'Saving...' : 'Save Entry'}
          </Button>
        </CardContent>
      </Card>
      
      {entries.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Past Entries
            </Typography>
            <List>
              {entries.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={format(new Date(item.timestamp), 'MMMM d, yyyy - h:mm a')}
                      secondary={item.content}
                      secondaryTypographyProps={{ whiteSpace: 'pre-line' }}
                    />
                  </ListItem>
                  {index < entries.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Journal;