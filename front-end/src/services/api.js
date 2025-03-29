import axios from 'axios';

// Mock API functions - replace with actual API calls
export const auth = {
  onAuthStateChanged: (callback) => {
    // Mock auth state change
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    callback(user);
    return () => {};
  },
  signInWithEmailAndPassword: async (email, password) => {
    // Mock login
    const user = { uid: 'mock-user-id', email, displayName: 'Mock User' };
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },
  createUserWithEmailAndPassword: async (email, password) => {
    // Mock registration
    const user = { uid: 'mock-user-id', email, displayName: 'Mock User' };
    localStorage.setItem('user', JSON.stringify(user));
    return { user };
  },
  signOut: async () => {
    localStorage.removeItem('user');
  },
  sendPasswordResetEmail: async (email) => {
    // Mock password reset
    return new Promise(resolve => setTimeout(resolve, 1000));
  }
};

export const trackMood = async (userId, data) => {
  // Mock mood tracking
  const moods = JSON.parse(localStorage.getItem('moods') || '[]');
  moods.push({ ...data, userId });
  localStorage.setItem('moods', JSON.stringify(moods));
  return data;
};

export const getMoodHistory = async (userId) => {
  // Mock mood history
  const moods = JSON.parse(localStorage.getItem('moods') || '[]');
  return moods.filter(mood => mood.userId === userId);
};

export const saveJournalEntry = async (userId, data) => {
  // Mock journal entry
  const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
  entries.push({ ...data, userId });
  localStorage.setItem('journalEntries', JSON.stringify(entries));
  return data;
};

export const getJournalEntries = async (userId) => {
  // Mock journal entries
  const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
  return entries.filter(entry => entry.userId === userId);
};

export const getResources = async () => {
  // Mock resources
  return [
    {
      id: '1',
      title: 'National Suicide Prevention Lifeline',
      description: '24/7 free and confidential support for people in distress',
      category: 'crisis',
      link: 'https://suicidepreventionlifeline.org',
      location: 'US'
    },
    {
      id: '2',
      title: 'Crisis Text Line',
      description: 'Free 24/7 support for those in crisis. Text HOME to 741741',
      category: 'crisis',
      link: 'https://www.crisistextline.org',
      location: 'US'
    },
    {
      id: '3',
      title: 'BetterHelp Online Therapy',
      description: 'Professional counseling with licensed therapists',
      category: 'therapy',
      link: 'https://www.betterhelp.com',
      location: 'Online'
    },
    {
      id: '4',
      title: 'Mindfulness Meditation Guide',
      description: 'Learn mindfulness techniques to reduce stress and anxiety',
      category: 'self-help',
      link: 'https://www.mindful.org/meditation/mindfulness-getting-started/',
      location: 'Online'
    }
  ];
};

export const getCommunityPosts = async () => {
  // Mock community posts
  return JSON.parse(localStorage.getItem('communityPosts') || '[]');
};

export const addCommunityPost = async (post) => {
  // Mock add post
  const posts = JSON.parse(localStorage.getItem('communityPosts') || '[]');
  posts.push({ ...post, id: `post-${Date.now()}` });
  localStorage.setItem('communityPosts', JSON.stringify(posts));
  return post;
};

export const getUserLocation = async (userId) => {
  // Mock location
  return 'US';
};