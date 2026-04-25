import React, { useState, useEffect } from 'react';
import { Card, Typography, Box, LinearProgress, Alert } from '@mui/material';
import reportService from '../services/reportService';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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

  if (loading) return <Typography sx={{ color: '#a0a0c0' }}>Loading...</Typography>;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!summary) return <Alert severity="info">No data available</Alert>;

  const isExceeded = summary.spendingPercentage > 100;
  const progressColor = isExceeded ? '#ff1744' : '#00ff88';

  return (
    <Card
      sx={{
        p: 3,
        background: isExceeded
          ? 'linear-gradient(135deg, rgba(255, 23, 68, 0.15) 0%, rgba(255, 23, 68, 0.05) 100%)'
          : 'linear-gradient(135deg, rgba(0, 255, 136, 0.15) 0%, rgba(0, 255, 136, 0.05) 100%)',
        border: `1px solid ${isExceeded ? 'rgba(255, 23, 68, 0.3)' : 'rgba(0, 255, 136, 0.3)'}`,
        borderRadius: '16px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: isExceeded
            ? '0 8px 32px rgba(255, 23, 68, 0.2)'
            : '0 8px 32px rgba(0, 255, 136, 0.2)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: isExceeded ? '#ff6b9d' : '#00ff88',
          }}
        >
          💰 Budget Overview
        </Typography>
        {isExceeded ? (
          <WarningAmberIcon sx={{ color: '#ffa500', fontSize: 28 }} />
        ) : (
          <CheckCircleIcon sx={{ color: '#00ff88', fontSize: 28 }} />
        )}
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" sx={{ color: '#a0a0c0' }}>
            Monthly Budget
          </Typography>
          <Typography variant="body2" sx={{ color: '#00d4ff', fontWeight: 600 }}>
            ${summary.monthlyBudget.toFixed(2)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" sx={{ color: '#a0a0c0' }}>
            Current Spending
          </Typography>
          <Typography variant="body2" sx={{ color: '#ff1744', fontWeight: 600 }}>
            ${summary.totalSpending.toFixed(2)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ color: '#a0a0c0' }}>
            Remaining
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              color: isExceeded ? '#ff6b9d' : '#00ff88',
            }}
          >
            ${summary.remainingBudget.toFixed(2)}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="caption" sx={{ color: '#7a7a9e', fontWeight: 600 }}>
            Budget Usage
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: progressColor,
              fontWeight: 700,
              fontSize: '0.85rem',
            }}
          >
            {summary.spendingPercentage.toFixed(1)}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={Math.min(summary.spendingPercentage, 100)}
          sx={{
            height: 10,
            borderRadius: '10px',
            backgroundColor: 'rgba(0, 212, 255, 0.1)',
            '& .MuiLinearProgress-bar': {
              background: `linear-gradient(90deg, ${progressColor} 0%, ${isExceeded ? '#ff6b9d' : '#00d4ff'} 100%)`,
              borderRadius: '10px',
              transition: 'all 0.3s',
            },
          }}
        />
      </Box>

      {isExceeded && (
        <Alert
          severity="warning"
          icon={<WarningAmberIcon />}
          sx={{
            backgroundColor: 'rgba(255, 165, 0, 0.1)',
            borderColor: 'rgba(255, 165, 0, 0.3)',
            color: '#ffb74d',
            border: '1px solid',
            borderRadius: '8px',
            '& .MuiAlert-icon': {
              color: '#ffa500',
            },
          }}
        >
          ⚠️ You have exceeded your budget by ${(summary.totalSpending - summary.monthlyBudget).toFixed(2)}
        </Alert>
      )}
    </Card>
  );
};

export default BudgetAlertWidget;
