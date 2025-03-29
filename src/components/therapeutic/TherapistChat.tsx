
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Mic, Music } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hello! I'm your AI therapist. How are you feeling today?",
    sender: 'ai',
    timestamp: new Date(),
  },
];

const TherapistChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const apiKey = 'AIzaSyBEcoVu-L4ZgaCBcaEcDdX2Q2YAzmxcD8g';

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await callGeminiAPI(input);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      toast.error('Sorry, I had trouble responding. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const callGeminiAPI = async (userInput: string): Promise<string> => {
    try {
      // This is a mock API call - in production, this would call the actual Gemini API
      // For demo purposes, we'll simulate a response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const contextualResponses: Record<string, string[]> = {
        anxiety: [
          "I notice you're talking about anxiety. Deep breathing exercises can help. Would you like to try a quick breathing technique with me?",
          "Anxiety can be challenging. What specific situations trigger your anxiety the most?",
          "Sometimes anxiety comes from anticipating future events. Let's focus on what you can control in the present moment."
        ],
        sad: [
          "I'm sorry you're feeling down. Remember that emotions are temporary and it's okay to feel this way sometimes.",
          "When you're feeling sad, it can help to connect with others. Is there someone you could reach out to today?",
          "Sometimes a change of environment can help shift your mood. Could you go for a brief walk outside?"
        ],
        stressed: [
          "Stress affects both mind and body. Let's identify what's causing your stress and work on some coping strategies.",
          "When experiencing stress, it helps to break problems into smaller, manageable parts. What's one small step you could take today?",
          "Remember to take short breaks when you feel overwhelmed. Even 5 minutes of mindfulness can reset your stress response."
        ],
        default: [
          "Thank you for sharing that with me. Could you tell me more about how that makes you feel?",
          "I appreciate your openness. How long have you been experiencing this?",
          "That sounds challenging. What strategies have you tried so far to address this?",
          "I'm here to support you. Let's explore this together and find what might help you feel better."
        ]
      };
      
      // Determine which response type to use based on user input
      let responseArray = contextualResponses.default;
      if (userInput.toLowerCase().includes('anxious') || userInput.toLowerCase().includes('anxiety')) {
        responseArray = contextualResponses.anxiety;
      } else if (userInput.toLowerCase().includes('sad') || userInput.toLowerCase().includes('depressed')) {
        responseArray = contextualResponses.sad;
      } else if (userInput.toLowerCase().includes('stress') || userInput.toLowerCase().includes('overwhelmed')) {
        responseArray = contextualResponses.stressed;
      }
      
      // Get random response from the appropriate category
      const randomIndex = Math.floor(Math.random() * responseArray.length);
      
      // Add music suggestion occasionally
      if (Math.random() > 0.7) {
        const musicSuggestions = [
          "Would you like me to suggest some calming music that might help? Just ask for music recommendations.",
          "Music can be therapeutic. I can recommend some tracks if you're interested.",
          "Sometimes music therapy can help with these feelings. Let me know if you'd like some suggestions."
        ];
        const randomMusicSuggestion = musicSuggestions[Math.floor(Math.random() * musicSuggestions.length)];
        return `${responseArray[randomIndex]} ${randomMusicSuggestion}`;
      }
      
      return responseArray[randomIndex];
      
      // In production, this would be the actual API call:
      /*
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a compassionate, professional psychiatrist. Your goal is to provide supportive therapeutic responses to the user. Be empathetic, reflective, and focus on the user's emotions and experiences. Suggest healthy coping mechanisms when appropriate and occasionally recommend music therapy. Keep responses concise and conversational. The user says: ${userInput}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });
      
      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else if (data.promptFeedback?.blockReason) {
        return "I'm unable to respond to that. Let's discuss something else that might help you.";
      } else {
        throw new Error('Unexpected API response structure');
      }
      */
    } catch (error) {
      console.error('Error in Gemini API call:', error);
      return "I apologize, but I'm having trouble connecting right now. Could you please try again in a moment?";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleVoiceInput = () => {
    toast.info("Voice input feature coming soon!");
  };

  const requestMusicSuggestion = () => {
    setInput("Can you recommend some music to help with my mood?");
  };

  return (
    <div className="therapeutic-card flex flex-col h-[600px]">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={msg.sender === 'user' ? 'chat-message-user' : 'chat-message-ai'}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="chat-message-ai">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-therapeutic-purple animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-therapeutic-purple animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 rounded-full bg-therapeutic-purple animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="border-t border-therapeutic-purple/10 p-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={requestMusicSuggestion}
            className="shrink-0"
          >
            <Music className="h-5 w-5 text-therapeutic-darkPurple" />
          </Button>
          
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1"
          />
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleVoiceInput}
            className="shrink-0"
          >
            <Mic className="h-5 w-5 text-therapeutic-darkPurple" />
          </Button>
          
          <Button 
            onClick={sendMessage} 
            size="icon" 
            className="shrink-0 bg-therapeutic-purple hover:bg-therapeutic-darkPurple"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TherapistChat;
