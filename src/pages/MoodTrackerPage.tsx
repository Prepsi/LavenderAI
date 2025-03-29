
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import Navbar from '@/components/layout/Navbar';
import MoodTracker from '@/components/therapeutic/MoodTracker';
import MoodSelector from '@/components/therapeutic/MoodSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

const MoodTrackerPage = () => {
  const [selectedMood, setSelectedMood] = React.useState<string | null>(null);
  
  const saveMoodEntry = () => {
    if (!selectedMood) {
      toast.error("Please select your mood first.");
      return;
    }
    
    // In a real app, this would save to a database
    toast.success("Today's mood has been recorded!");
    setSelectedMood(null);
  };
  
  return (
    <>
      <Navbar />
      <PageContainer>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-therapeutic-deepPurple">Mood Tracker</h1>
            <p className="text-gray-600">Monitor your emotional well-being and discover patterns over time</p>
          </div>
          
          <Card className="therapeutic-card mb-6">
            <CardHeader>
              <CardTitle className="text-therapeutic-deepPurple">How are you feeling today?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MoodSelector 
                selectedMood={selectedMood} 
                onSelectMood={setSelectedMood} 
              />
              
              <div className="flex justify-end">
                <Button 
                  onClick={saveMoodEntry}
                  disabled={!selectedMood}
                  className="bg-therapeutic-purple hover:bg-therapeutic-darkPurple"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Today's Mood
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <MoodTracker />
          
          <div className="text-center text-sm text-gray-500 p-4 bg-gray-50 rounded-lg">
            <p>Tracking your mood can help identify patterns and triggers in your emotional well-being.</p>
            <p className="mt-2">Regular check-ins provide valuable insights for your mental health journey.</p>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default MoodTrackerPage;
