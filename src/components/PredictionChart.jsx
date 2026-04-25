import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, CircularProgress, Alert } from '@mui/material';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import predictionService from '../services/predictionService';

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

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  const chartData = {
    labels: predictions.map((p) => p.forecastedMonth),
    datasets: [
      {
        label: 'Forecasted Spending',
        data: predictions.map((p) => p.forecastedAmount),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Paper elevation={2} sx={{ padding: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Spending Forecast
      </Typography>
      {predictions.length === 0 ? (
        <Alert severity="info">No forecast data available</Alert>
      ) : (
        <Box sx={{ height: 300 }}>
          <Line data={chartData} options={chartOptions} />
        </Box>
      )}
    </Paper>
  );
};

export default PredictionChart;
