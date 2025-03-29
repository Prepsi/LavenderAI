
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import Navbar from '@/components/layout/Navbar';
import TherapistChat from '@/components/therapeutic/TherapistChat';

const TherapistPage = () => {
  return (
    <>
      <Navbar />
      <PageContainer>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-therapeutic-deepPurple">AI Therapist</h1>
            <p className="text-gray-600">Chat with your AI psychiatric assistant</p>
          </div>
          
          <TherapistChat />
          
          <div className="text-center text-sm text-gray-500 p-4 bg-gray-50 rounded-lg">
            <p>This AI assistant is designed to provide support but is not a replacement for professional medical advice, diagnosis, or treatment.</p>
            <p className="mt-2">If you're experiencing a mental health emergency, please call your local emergency services or crisis helpline immediately.</p>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default TherapistPage;
