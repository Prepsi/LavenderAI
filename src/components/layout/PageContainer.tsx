
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, className = "" }) => {
  const isMobile = useIsMobile();
  
  return (
    <main className={`min-h-screen w-full pt-4 pb-20 md:py-20 md:pt-24 px-4 ${className}`}>
      <div className="container mx-auto max-w-6xl">
        {children}
      </div>
    </main>
  );
};

export default PageContainer;
