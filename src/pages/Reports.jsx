import React from 'react';
import { Box, Paper, Typography, Container } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import ReportExportButton from '../components/ReportExportButton.jsx';
import reportService from '../services/reportService';
import { useState, useEffect } from 'react';

const Reports = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.userId) {
      fetchSummary();
    }
  }, [user]);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const response = await reportService.getReportSummary(user.userId, 10000);
      setSummary(response.data);
    } catch (err) {
      console.error('Failed to fetch summary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Reports & Export
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Export Options
        </Typography>
        <ReportExportButton userId={user?.userId} />
      </Paper>

      {summary && (
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Summary
          </Typography>
          <Typography>Total Spending: ${summary.totalSpending.toFixed(2)}</Typography>
          <Typography>Average Transaction: ${summary.averageTransaction.toFixed(2)}</Typography>
          <Typography>Transaction Count: {summary.transactionCount}</Typography>
          <Typography>Monthly Budget: ${summary.monthlyBudget.toFixed(2)}</Typography>
          <Typography>Remaining Budget: ${summary.remainingBudget.toFixed(2)}</Typography>
          <Typography>Spending: {summary.spendingPercentage.toFixed(1)}%</Typography>
        </Paper>
      )}
    </Container>
  );
};

export default Reports;
