
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Save, BookOpen, Brain } from 'lucide-react';
import { toast } from 'sonner';

interface JournalEntryProps {
  onSave?: (content: string) => void;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ onSave }) => {
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  
  const handleSave = () => {
    if (!content.trim()) {
      toast.error("Please write something before saving.");
      return;
    }
    
    // In a real app, this would save the journal entry
    if (onSave) {
      onSave(content);
    }
    
    toast.success("Journal entry saved successfully!");
    setContent('');
    setAnalysis(null);
  };
  
  const analyzeEntry = () => {
    if (!content.trim()) {
      toast.error("Please write something to analyze.");
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate API call to Gemini for analysis
    setTimeout(() => {
      // Mock analysis - in production, this would call the Gemini API
      const mockAnalyses = [
        "I notice your writing expresses feelings of hope and optimism. You're showing resilience and a positive outlook.",
        "Your journal entry suggests you're experiencing some stress, but you're also showing awareness of your emotions, which is a healthy coping mechanism.",
        "There are themes of self-reflection in your writing, which is a beneficial practice for mental well-being.",
        "Your writing shows thoughtfulness and introspection. Continue developing these reflective practices.",
        "I notice a pattern of gratitude in your entry, which research shows can significantly improve mental health.",
      ];
      
      const randomAnalysis = mockAnalyses[Math.floor(Math.random() * mockAnalyses.length)];
      setAnalysis(randomAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };
  
  return (
    <div className="space-y-4">
      <Card className="therapeutic-card">
        <CardHeader>
          <CardTitle className="flex items-center text-therapeutic-deepPurple">
            <BookOpen className="mr-2 h-5 w-5" />
            New Journal Entry
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your thoughts and feelings here..."
            className="min-h-[200px] resize-none"
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={analyzeEntry}
            disabled={isAnalyzing || !content.trim()}
            className="text-therapeutic-darkPurple"
          >
            <Brain className="mr-2 h-4 w-4" />
            {isAnalyzing ? "Analyzing..." : "Analyze"}
          </Button>
          <Button
            onClick={handleSave}
            disabled={!content.trim()}
            className="bg-therapeutic-purple hover:bg-therapeutic-darkPurple"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Entry
          </Button>
        </CardFooter>
      </Card>
      
      {analysis && (
        <Card className="therapeutic-card border-therapeutic-softGreen/50">
          <CardHeader>
            <CardTitle className="flex items-center text-therapeutic-deepPurple text-sm">
              <Brain className="mr-2 h-4 w-4" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{analysis}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JournalEntry;
