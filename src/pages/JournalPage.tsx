
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import Navbar from '@/components/layout/Navbar';
import JournalEntry from '@/components/therapeutic/JournalEntry';

const JournalPage = () => {
  return (
    <>
      <Navbar />
      <PageContainer>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-therapeutic-deepPurple">Therapeutic Journal</h1>
            <p className="text-gray-600">Express your thoughts and receive AI insights to support your journey</p>
          </div>
          
          <JournalEntry />
          
          <div className="text-center text-sm text-gray-500 p-4 bg-gray-50 rounded-lg">
            <p>Journaling helps process emotions and gain clarity. Your entries are private and secure.</p>
            <p className="mt-2">The AI analysis offers a perspective on your writing, but is not a clinical assessment.</p>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default JournalPage;
