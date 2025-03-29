
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Brain, Music, Book, Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const isMobile = useIsMobile();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-therapeutic-purple/10 md:top-0 md:bottom-auto md:border-t-0 md:border-b z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {!isMobile && (
          <Link to="/" className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-therapeutic-purple" />
            <span className="font-semibold text-lg text-therapeutic-deepPurple">Mental Health Companion</span>
          </Link>
        )}
        
        <div className={`flex ${isMobile ? 'w-full justify-around' : 'gap-1'}`}>
          <Button asChild variant="ghost" size={isMobile ? "icon" : "default"} className="text-therapeutic-darkPurple">
            <Link to="/">
              {isMobile ? <Home className="h-5 w-5" /> : (
                <>
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </>
              )}
            </Link>
          </Button>
          
          <Button asChild variant="ghost" size={isMobile ? "icon" : "default"} className="text-therapeutic-darkPurple">
            <Link to="/therapist">
              {isMobile ? <Brain className="h-5 w-5" /> : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Therapist
                </>
              )}
            </Link>
          </Button>
          
          {/* <Button asChild variant="ghost" size={isMobile ? "icon" : "default"} className="text-therapeutic-darkPurple">
            <Link to="/music">
              {isMobile ? <Music className="h-5 w-5" /> : (
                <>
                  <Music className="mr-2 h-4 w-4" />
                  Music
                </>
              )}
            </Link>
          </Button> */}
          
          <Button asChild variant="ghost" size={isMobile ? "icon" : "default"} className="text-therapeutic-darkPurple">
            <Link to="/journal">
              {isMobile ? <Book className="h-5 w-5" /> : (
                <>
                  <Book className="mr-2 h-4 w-4" />
                  Journal
                </>
              )}
            </Link>
          </Button>
          
          {/* <Button asChild variant="ghost" size={isMobile ? "icon" : "default"} className="text-therapeutic-darkPurple">
            <Link to="/mood-tracker">
              {isMobile ? <Calendar className="h-5 w-5" /> : (
                <>
                  <Calendar className="mr-2 h-4 w-4" />
                  Mood
                </>
              )}
            </Link> */}
          {/* </Button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
