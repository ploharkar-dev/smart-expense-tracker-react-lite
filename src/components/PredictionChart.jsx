import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, CircularProgress, Alert } from '@mui/material';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import predictionService from '../services/predictionService';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const PredictionChart = ({ userId }) => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userId) {
      fetchPredictions();
    }
  }, [userId]);

  const fetchPredictions = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await predictionService.getAllForecasts(userId);
      setPredictions(response.data);
    } catch (err) {
      setError('Failed to fetch predictions');
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress sx={{ color: '#00d4ff' }} />
      </Box>
    );
  if (error)
    return (
      <Alert severity="error" sx={{ backgroundColor: 'rgba(255, 23, 68, 0.1)', border: '1px solid rgba(255, 23, 68, 0.3)' }}>
        {error}
      </Alert>
    );

  const chartData = {
    labels: predictions.map((p) => p.forecastedMonth),
    datasets: [
      {
        label: 'Forecasted Spending',
        data: predictions.map((p) => p.forecastedAmount),
        borderColor: '#00d4ff',
        backgroundColor: 'rgba(0, 212, 255, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#ff006e',
        pointBorderColor: '#00d4ff',
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBorderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: '#a0a0c0',
          font: {
            size: 12,
            weight: '600',
          },
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(21, 29, 59, 0.95)',
        titleColor: '#00d4ff',
        bodyColor: '#a0a0c0',
        borderColor: 'rgba(0, 212, 255, 0.3)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        titleFont: {
          size: 13,
          weight: '600',
        },
        bodyFont: {
          size: 12,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 212, 255, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#a0a0c0',
          font: {
            size: 11,
          },
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#a0a0c0',
          font: {
            size: 11,
          },
        },
      },
    },
  };

  return (
    <Card
      sx={{
        p: 3,
        background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(255, 0, 110, 0.05) 100%)',
        border: '1px solid rgba(0, 212, 255, 0.1)',
        borderRadius: '16px',
        transition: 'all 0.3s',
        '&:hover': {
          borderColor: 'rgba(0, 212, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 212, 255, 0.1)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <TrendingUpIcon sx={{ color: '#00d4ff', fontSize: 28 }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          📈 Spending Forecast
        </Typography>
      </Box>

      {predictions.length === 0 ? (
        <Alert
          severity="info"
          sx={{
            backgroundColor: 'rgba(0, 212, 255, 0.1)',
            borderColor: 'rgba(0, 212, 255, 0.3)',
            color: '#00d4ff',
            border: '1px solid',
          }}
        >
          ℹ️ No forecast data available yet. Add more transactions to see predictions.
        </Alert>
      ) : (
        <Box sx={{ height: 350, position: 'relative' }}>
          <Line data={chartData} options={chartOptions} />
        </Box>
      )}
    </Card>
  );
};

export default PredictionChart;
