
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Heart } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data - in a real app, this would come from a database
const generateMockData = () => {
  const today = new Date();
  const data = [];
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    // Generate a random mood score between 1-5, with some realistic patterns
    let moodScore;
    const previousScore = data.length > 0 ? data[data.length - 1].mood : 3;
    const randomChange = Math.random() * 1.5 - 0.75; // Random change between -0.75 and 0.75
    moodScore = Math.max(1, Math.min(5, previousScore + randomChange));
    moodScore = parseFloat(moodScore.toFixed(1));
    
    data.push({
      date: date.toISOString().split('T')[0],
      mood: moodScore
    });
  }
  
  return data;
};

const moodData = generateMockData();

const calculateAverageMood = (data: { date: string; mood: number }[]) => {
  const sum = data.reduce((total, entry) => total + entry.mood, 0);
  return (sum / data.length).toFixed(1);
};

const moodColor = (mood: number) => {
  if (mood >= 4) return "#F2FCE2"; // Happy
  if (mood >= 3) return "#D3E4FD"; // Content
  if (mood >= 2) return "#FDE1D3"; // Neutral
  return "#FEF7CD"; // Sad
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const moodValue = payload[0].value;
    let moodText = "Unknown";
    
    if (moodValue >= 4.5) moodText = "Very Happy";
    else if (moodValue >= 3.5) moodText = "Happy";
    else if (moodValue >= 2.5) moodText = "Neutral";
    else if (moodValue >= 1.5) moodText = "Sad";
    else moodText = "Very Sad";
    
    return (
      <div className="bg-white/90 p-2 rounded shadow border border-therapeutic-purple/20">
        <p className="font-medium">{formatDate(label)}</p>
        <p className="text-sm">Mood: {moodText} ({moodValue})</p>
      </div>
    );
  }
  
  return null;
};

const MoodTracker: React.FC = () => {
  const averageMood = calculateAverageMood(moodData);
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('month');
  
  const filteredData = timeRange === 'week' 
    ? moodData.slice(-7) 
    : moodData;
  
  const averageMoodColor = moodColor(parseFloat(averageMood));
  
  return (
    <div className="space-y-6">
      <Card className="therapeutic-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center text-therapeutic-deepPurple">
              <Calendar className="mr-2 h-5 w-5" />
              Mood History
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setTimeRange('week')}
                className={`px-3 py-1 rounded text-sm ${timeRange === 'week' ? 'bg-therapeutic-purple text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Week
              </button>
              <button 
                onClick={() => setTimeRange('month')}
                className={`px-3 py-1 rounded text-sm ${timeRange === 'month' ? 'bg-therapeutic-purple text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Month
              </button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  tick={{ fontSize: 12 }}
                  interval={timeRange === 'week' ? 0 : 'preserveStartEnd'}
                />
                <YAxis 
                  domain={[1, 5]} 
                  tick={{ fontSize: 12 }}
                  ticks={[1, 2, 3, 4, 5]}
                />
                <Tooltip content={<CustomTooltip />} />
                <defs>
                  <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#9b87f5" 
                  fillOpacity={1} 
                  fill="url(#colorMood)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 flex justify-center items-center p-3 rounded-lg" style={{ backgroundColor: averageMoodColor }}>
            <Heart className="mr-2 h-5 w-5 text-therapeutic-deepPurple" />
            <span className="font-medium text-therapeutic-deepPurple">Average Mood: {averageMood}/5</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodTracker;
