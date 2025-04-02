export const analyzeMood = async (data) => {
    // Mock AI analysis
    return new Promise(resolve => {
      setTimeout(() => {
        const responses = [
          `I notice you're feeling ${data.mood < 3 ? 'a bit low' : 'good'} today. ${data.journalEntry ? 'Your journal entry shows you\'re reflecting on your feelings, which is a great practice.' : ''} Remember that moods fluctuate and it's okay to feel this way.`,
          `Based on your recent mood patterns, you might want to try some ${data.mood < 3 ? 'self-care activities' : 'activities to maintain your positive mood'}. ${data.history?.length ? 'I see some variation in your moods, which is completely normal.' : ''}`,
          `Thank you for sharing how you're feeling. ${data.mood < 3 ? 'Consider reaching out to someone you trust if you need support.' : 'It\'s great to see you\'re doing well!'} ${data.journalEntry ? 'Your reflections show good self-awareness.' : ''}`
        ];
        resolve(responses[Math.floor(Math.random() * responses.length)]);
      }, 1000);
    });
  };
  
  export const generateJournalPrompt = async (userId) => {
    // Mock journal prompt
    return new Promise(resolve => {
      setTimeout(() => {
        const prompts = [
          "Write about a recent situation that made you feel proud of yourself.",
          "Describe a challenge you're currently facing and how you might approach it.",
          "What are three things you're grateful for today?",
          "Reflect on a relationship that's important to you. What makes it special?",
          "Write about a time you overcame a difficult situation. What did you learn?"
        ];
        resolve(prompts[Math.floor(Math.random() * prompts.length)]);
      }, 1000);
    });
  };
  
  export const recommendResources = async (userId) => {
    // Mock resource recommendations
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: 'rec-1',
            title: 'Personalized Therapy Recommendations',
            description: 'Based on your mood patterns, these therapists specialize in areas that might help you',
            category: 'therapy',
            link: 'https://example.com/therapists',
            location: 'Online'
          },
          {
            id: 'rec-2',
            title: 'Mindfulness for Mood Regulation',
            description: 'Guided exercises tailored to your current needs',
            category: 'self-help',
            link: 'https://example.com/mindfulness',
            location: 'Online'
          }
        ]);
      }, 1500);
    });
  };
  
  export const moderateContent = async (content) => {
    // Mock content moderation
    return new Promise(resolve => {
      setTimeout(() => {
        // Simple keyword blocking for demo
        const blockedWords = ['hate', 'kill', 'hurt', 'suicide'];
        const containsBlockedWord = blockedWords.some(word => 
          content.toLowerCase().includes(word)
        );
        
        if (containsBlockedWord) {
          resolve({
            isApproved: false,
            message: "Your post contains content that doesn't meet our community guidelines."
          });
        } else {
          resolve({ isApproved: true });
        }
      }, 800);
    });
  };