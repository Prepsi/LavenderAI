
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Music, Play, ExternalLink } from 'lucide-react';

interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  mood: string;
  imageUrl: string;
  externalUrl: string;
}

const tracksByMood: Record<string, MusicTrack[]> = {
  calm: [
    {
      id: '1',
      title: 'Weightless',
      artist: 'Marconi Union',
      mood: 'calm',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273a8c214c299376793b0c9dad5',
      externalUrl: 'https://open.spotify.com/track/7zJHdHW9LoVW4pdP5fF7PJ'
    },
    {
      id: '2',
      title: 'Electra',
      artist: 'Airstream',
      mood: 'calm',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273b536cfb98c74558db48f8a46',
      externalUrl: 'https://open.spotify.com/track/5TvoQS5RU8gFZ8KRPw5X9d'
    },
    {
      id: '3',
      title: 'Pure Shores',
      artist: 'All Saints',
      mood: 'calm',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273c902d13de0b4b341eb63a1f5',
      externalUrl: 'https://open.spotify.com/track/3n0PSFzaYucG3jfsgIKyxW'
    }
  ],
  happy: [
    {
      id: '4',
      title: 'Happy',
      artist: 'Pharrell Williams',
      mood: 'happy',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b2732318e98aee8eac1a9a3f5f5e',
      externalUrl: 'https://open.spotify.com/track/60nZcImufyMA1MKQY3dcCO'
    },
    {
      id: '5',
      title: 'Good as Hell',
      artist: 'Lizzo',
      mood: 'happy',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273b3e54fdf3574fc5ae33d3897',
      externalUrl: 'https://open.spotify.com/track/6uAm7pG66O1XesXS9bpHSF'
    },
    {
      id: '6',
      title: 'Walking on Sunshine',
      artist: 'Katrina & The Waves',
      mood: 'happy',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273e3c64e1d2abf22bc1263c5e7',
      externalUrl: 'https://open.spotify.com/track/05wIrZSwuaVWhcv5FfqeH0'
    }
  ],
  sad: [
    {
      id: '7',
      title: 'Someone Like You',
      artist: 'Adele',
      mood: 'sad',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b2736b6d8c1a9c04ba4375428a98',
      externalUrl: 'https://open.spotify.com/track/4kflIGfjdZJW4ot2ioixTB'
    },
    {
      id: '8',
      title: 'Fix You',
      artist: 'Coldplay',
      mood: 'sad',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b2734e0362c225863f6ae2432651',
      externalUrl: 'https://open.spotify.com/track/7LVHVU3tWfcxj5aiPFEW4Q'
    },
    {
      id: '9',
      title: 'Everybody Hurts',
      artist: 'R.E.M.',
      mood: 'sad',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273f950d3fae236e3bba361c888',
      externalUrl: 'https://open.spotify.com/track/6PypGyiu0Y2lCDBN5sbtB4'
    }
  ],
  energetic: [
    {
      id: '10',
      title: 'Don\'t Stop Me Now',
      artist: 'Queen',
      mood: 'energetic',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273056e90910cbaf5c5b892aeba',
      externalUrl: 'https://open.spotify.com/track/5T8EDUDqKcs6OSOwEsfqG7'
    },
    {
      id: '11',
      title: 'Can\'t Hold Us',
      artist: 'Macklemore & Ryan Lewis',
      mood: 'energetic',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b2739c3a6d908bcae55a2c953eda',
      externalUrl: 'https://open.spotify.com/track/3bidbhpOYeV4knp8AIu8Xn'
    },
    {
      id: '12',
      title: 'Uptown Funk',
      artist: 'Mark Ronson ft. Bruno Mars',
      mood: 'energetic',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273e11e5b1efa08c8467493aa6d',
      externalUrl: 'https://open.spotify.com/track/32OlwWuMpZ6b0aN2RZOeMS'
    }
  ],
  focus: [
    {
      id: '13',
      title: 'Experience',
      artist: 'Ludovico Einaudi',
      mood: 'focus',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273e3081b18c24bde5e1280bf3a',
      externalUrl: 'https://open.spotify.com/track/1BncfTJAWxrsxyT9culBrj'
    },
    {
      id: '14',
      title: 'Intro',
      artist: 'The xx',
      mood: 'focus',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b27340b7bea46307575010a8094f',
      externalUrl: 'https://open.spotify.com/track/0verXMHwg2jFqiUDnGc4Pj'
    },
    {
      id: '15',
      title: 'Arrival of the Birds',
      artist: 'The Cinematic Orchestra',
      mood: 'focus',
      imageUrl: 'https://i.scdn.co/image/ab67616d0000b273613e850487739ad18f7b868e',
      externalUrl: 'https://open.spotify.com/track/4HcKNkoEFg9cASWVpnkrtu'
    }
  ]
};

interface MusicRecommendationsProps {
  initialMood?: string;
}

const MusicRecommendations: React.FC<MusicRecommendationsProps> = ({ initialMood = 'calm' }) => {
  const [selectedMood, setSelectedMood] = useState(initialMood);
  
  const moods = [
    { id: 'calm', label: 'Calm & Relaxing' },
    { id: 'happy', label: 'Uplifting & Happy' },
    { id: 'sad', label: 'Comforting & Soothing' },
    { id: 'energetic', label: 'Energetic & Motivating' },
    { id: 'focus', label: 'Focus & Concentration' },
  ];
  
  const openExternalLink = (url: string) => {
    window.open(url, '_blank');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {moods.map((mood) => (
          <Button
            key={mood.id}
            variant={selectedMood === mood.id ? "default" : "outline"}
            onClick={() => setSelectedMood(mood.id)}
            className={selectedMood === mood.id ? "bg-therapeutic-purple hover:bg-therapeutic-darkPurple" : ""}
          >
            {mood.label}
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tracksByMood[selectedMood]?.map((track) => (
          <Card key={track.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-square w-full overflow-hidden">
              <img 
                src={track.imageUrl} 
                alt={`${track.title} by ${track.artist}`}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg truncate">{track.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">{track.artist}</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Play className="h-4 w-4 mr-1" /> Preview
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="shrink-0"
                  onClick={() => openExternalLink(track.externalUrl)}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MusicRecommendations;
