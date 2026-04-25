import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, LinearProgress, Alert } from '@mui/material';
import reportService from '../services/reportService';

const BudgetAlertWidget = ({ userId, monthlyBudget }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userId) {
      fetchSummary();
    }
  }, [userId]);

  const fetchSummary = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await reportService.getReportSummary(userId, monthlyBudget);
      setSummary(response.data);
    } catch (err) {
      setError('Failed to fetch budget summary');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!summary) return <Alert severity="info">No data available</Alert>;

  const isExceeded = summary.spendingPercentage > 100;

  return (
    <Paper
      elevation={2}
      sx={{
        padding: 3,
        backgroundColor: isExceeded ? 'rgba(244, 67, 54, 0.1)' : 'rgba(76, 175, 80, 0.1)',
        borderLeft: `4px solid ${isExceeded ? '#f44336' : '#4caf50'}`,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Budget Alert
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2">
          Monthly Budget: ${summary.monthlyBudget.toFixed(2)}
        </Typography>
        <Typography variant="body2">
          Current Spending: ${summary.totalSpending.toFixed(2)}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          Remaining: ${summary.remainingBudget.toFixed(2)}
        </Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <LinearProgress
          variant="determinate"
          value={Math.min(summary.spendingPercentage, 100)}
          sx={{
            height: 8,
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: isExceeded ? '#f44336' : '#4caf50',
            },
          }}
        />
        <Typography variant="caption" sx={{ mt: 1 }}>
          {summary.spendingPercentage.toFixed(1)}% of budget used
        </Typography>
      </Box>
      {isExceeded && (
        <Alert severity="warning">
          Warning: You have exceeded your budget by ${(summary.totalSpending - summary.monthlyBudget).toFixed(2)}
        </Alert>
      )}
    </Paper>
  );
};

export default BudgetAlertWidget;
