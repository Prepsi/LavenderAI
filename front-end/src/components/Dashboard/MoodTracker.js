import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MoodChart = ({ data }) => {
  const theme = useTheme();

  const chartData = {
    labels: data.map(item => new Date(item.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'Mood Level',
        data: data.map(item => item.mood),
        borderColor: theme.palette.primary.main,
        backgroundColor: `${theme.palette.primary.main}40`,
        tension: 0.3,
        pointBackgroundColor: theme.palette.primary.main,
        pointRadius: 5,
        pointHoverRadius: 7,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Mood: ${context.raw}/5`;
          }
        }
      }
    },
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default MoodChart;