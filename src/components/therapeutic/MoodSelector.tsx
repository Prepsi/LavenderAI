
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const moods = [
  { value: 'veryHappy', emoji: '😄', label: 'Very Happy', color: 'bg-therapeutic-softGreen' },
  { value: 'neutral', emoji: '😐', label: 'Neutral', color: 'bg-therapeutic-softBlue' },
  { value: 'sad', emoji: '😔', label: 'Sad', color: 'bg-therapeutic-purple/20' },
  { value: 'angry', emoji: '😡', label: 'Angry', color: 'bg-therapeutic-red/20' },
  { value: 'anxious', emoji: '😰', label: 'Anxious', color: 'bg-therapeutic-orange/20' },
  { value: 'excited', emoji: '🤩', label: 'Excited', color: 'bg-therapeutic-softPink' },
];

interface MoodSelectorProps {
  selectedMood: string | null;
  onSelectMood: (mood: string) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onSelectMood }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center md:justify-between">
      {moods.map((mood) => (
        <Button
          key={mood.value}
          onClick={() => onSelectMood(mood.value)}
          variant="outline"
          className={cn(
            "flex flex-col items-center p-4 h-auto transition-all",
            selectedMood === mood.value 
              ? `ring-2 ring-therapeutic-purple ${mood.color}` 
              : "hover:bg-therapeutic-softBlue/50"
          )}
        >
          <span className="text-3xl mb-2">{mood.emoji}</span>
          <span className="text-sm">{mood.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default MoodSelector;
