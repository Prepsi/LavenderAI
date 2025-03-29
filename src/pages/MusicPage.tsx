
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import Navbar from '@/components/layout/Navbar';
import MusicRecommendations from '@/components/therapeutic/MusicRecommendations';

const MusicPage = () => {
  return (
    <>
      <Navbar />
      <PageContainer>
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-therapeutic-deepPurple">Music Therapy</h1>
            <p className="text-gray-600">Discover music recommendations to support your mental wellbeing</p>
          </div>
          
          <div className="therapeutic-card">
            <MusicRecommendations />
          </div>
          
          <div className="text-center text-sm text-gray-500 p-4 bg-gray-50 rounded-lg">
            <p>Music can have a profound effect on our emotions and mental state. The recommendations are curated based on research on music's therapeutic effects.</p>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default MusicPage;
