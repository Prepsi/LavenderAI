
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Music, Book, HeartPulse, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import Navbar from '@/components/layout/Navbar';
import MoodSelector from '@/components/therapeutic/MoodSelector';

const Index = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  
  return (
    <>
      <Navbar />
      <PageContainer>
        <div className="space-y-10">
          <section className="text-center max-w-2xl mx-auto space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-therapeutic-deepPurple animate-float">
              Mental Health Companion
            </h1>
            <p className="text-xl text-therapeutic-darkPurple/80">
              Your AI-powered support system for mental wellness
            </p>
          </section>
          
          <section className="therapeutic-card">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-therapeutic-deepPurple">How are you feeling today?</h2>
              <p className="text-gray-600">Select your current mood</p>
            </div>
            
            <MoodSelector 
              selectedMood={selectedMood} 
              onSelectMood={setSelectedMood} 
            />
            
            {selectedMood && (
              <div className="mt-6 text-center">
                <Link to="/therapist">
                  <Button className="bg-therapeutic-purple hover:bg-therapeutic-darkPurple">
                    Talk about it
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-therapeutic-deepPurple mb-6">Support Options</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="therapeutic-card hover:shadow-md transition-all border-therapeutic-purple/10 hover:border-therapeutic-purple/30">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-therapeutic-softBlue flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-therapeutic-darkPurple" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">AI Therapist</h3>
                  <p className="text-gray-600 mb-4">Chat with our AI psychiatric assistant for support and guidance.</p>
                  <Link to="/therapist" className="mt-auto">
                    <Button variant="outline" className="w-full">
                      Chat Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="therapeutic-card hover:shadow-md transition-all border-therapeutic-purple/10 hover:border-therapeutic-purple/30">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-therapeutic-softGreen flex items-center justify-center mb-4">
                    <Music className="h-6 w-6 text-therapeutic-darkPurple" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Music Therapy</h3>
                  <p className="text-gray-600 mb-4">Discover music recommendations tailored to improve your mood.</p>
                  <Link to="/music" className="mt-auto">
                    <Button variant="outline" className="w-full">
                      Find Music
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="therapeutic-card hover:shadow-md transition-all border-therapeutic-purple/10 hover:border-therapeutic-purple/30">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-therapeutic-softYellow flex items-center justify-center mb-4">
                    <Book className="h-6 w-6 text-therapeutic-darkPurple" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Guided Journal</h3>
                  <p className="text-gray-600 mb-4">Express your thoughts and feelings with AI-assisted journaling.</p>
                  <Link to="/journal" className="mt-auto">
                    <Button variant="outline" className="w-full">
                      Start Writing
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="therapeutic-card hover:shadow-md transition-all border-therapeutic-purple/10 hover:border-therapeutic-purple/30">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-therapeutic-softPeach flex items-center justify-center mb-4">
                    <HeartPulse className="h-6 w-6 text-therapeutic-darkPurple" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Mood Tracker</h3>
                  <p className="text-gray-600 mb-4">Monitor your emotional well-being and identify patterns over time.</p>
                  <Link to="/mood-tracker" className="mt-auto">
                    <Button variant="outline" className="w-full">
                      Track Mood
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </PageContainer>
    </>
  );
};

export default Index;
