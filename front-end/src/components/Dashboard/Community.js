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
  ListItemAvatar,
  Avatar,
  Divider,
  IconButton
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AuthContext } from '../../Contexts/AuthContext';
import { getCommunityPosts, addCommunityPost } from '../../services/api';
import { moderateContent } from '../../services/geminiService';
import { Favorite, FavoriteBorder, MoreVert } from '@mui/icons-material';
import { format } from 'date-fns';

const Community = () => {
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const communityPosts = await getCommunityPosts();
      setPosts(communityPosts);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) {
      setError('Please write something before posting');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const moderationResult = await moderateContent(newPost);
      
      if (moderationResult.isApproved) {
        await addCommunityPost({
          userId: user.uid,
          content: newPost,
          timestamp: new Date().toISOString(),
          isAnonymous: true,
          likes: []
        });
        setNewPost('');
        await loadPosts();
        setSuccess('Your post has been shared with the community!');
      } else {
        setError(moderationResult.message || "Your post couldn't be published due to community guidelines.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      // Implement like functionality
      // This would typically call an API to update the like count
      console.log(`Liked post ${postId}`);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Community Support
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Share your experiences and support others in a safe, anonymous space.
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
          <Typography variant="h6" gutterBottom>
            Share with the community
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Posts are anonymous and moderated for safety.
          </Typography>
          
          <TextField
            fullWidth
            multiline
            rows={3}
            label="What's on your mind?"
            variant="outlined"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!newPost.trim() || isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isLoading ? 'Posting...' : 'Post'}
          </Button>
        </CardContent>
      </Card>
      
      <Typography variant="h5" gutterBottom>
        Recent Posts
      </Typography>
      
      {posts.length > 0 ? (
        <Card>
          <List>
            {posts.map((post, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Anonymous" src="/anonymous-avatar.png" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body2" color="text.secondary">
                        {format(new Date(post.timestamp), 'MMMM d, yyyy - h:mm a')}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body1"
                          color="text.primary"
                          sx={{ display: 'block', mb: 1 }}
                        >
                          {post.content}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <IconButton 
                            size="small" 
                            onClick={() => handleLike(post.id)}
                            sx={{ mr: 1 }}
                          >
                            {post.likes && post.likes.includes(user?.uid) ? (
                              <Favorite color="error" fontSize="small" />
                            ) : (
                              <FavoriteBorder fontSize="small" />
                            )}
                          </IconButton>
                          <Typography variant="body2" color="text.secondary">
                            {post.likes ? post.likes.length : 0} supports
                          </Typography>
                        </Box>
                      </>
                    }
                  />
                </ListItem>
                {index < posts.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Card>
      ) : (
        <Alert severity="info">
          No posts yet. Be the first to share!
        </Alert>
      )}
    </Box>
  );
};

export default Community;