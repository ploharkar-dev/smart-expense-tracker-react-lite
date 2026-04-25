import React from 'react';
import { Box, Card, Typography, Container, Grid } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import ReportExportButton from '../components/ReportExportButton.jsx';
import reportService from '../services/reportService';
import { useState, useEffect } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AssignmentIcon from '@mui/icons-material/Assignment';

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
    const budget = Number(user?.properties?.monthlyBudget) || 0;
    try {
      const response = await reportService.getReportSummary(user.userId, budget);
      setSummary(response.data);
    } catch (err) {
      console.error('Failed to fetch summary');
    } finally {
      setLoading(false);
    }
  };

  const StatItem = ({ label, value, color }) => (
    <Box sx={{
      p: 2,
      borderRadius: '12px',
      background: `linear-gradient(135deg, rgba(${color}, 0.1) 0%, rgba(${color}, 0.05) 100%)`,
      border: `1px solid rgba(${color}, 0.2)`,
    }}>
      <Typography variant="body2" sx={{ color: '#a0a0c0', mb: 0.5, fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 700, color: `rgb(${color})` }}>
        {value}
      </Typography>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 1,
            background: 'linear-gradient(135deg, #00d4ff 0%, #ff006e 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <AnalyticsIcon sx={{ fontSize: '2.5rem' }} />
          Reports & Analytics
        </Typography>
        <Typography variant="body1" sx={{ color: '#a0a0c0', fontSize: '1.1rem' }}>
          Comprehensive financial reports and export options
        </Typography>
      </Box>

      {/* Export Section */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid item xs={12}>
          <Card
            sx={{
              p: 4,
              background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(255, 0, 110, 0.05) 100%)',
              border: '1px solid rgba(0, 212, 255, 0.1)',
              borderRadius: '16px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <DownloadIcon sx={{ color: '#00d4ff', fontSize: 28 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Export Your Data
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#a0a0c0', mb: 3 }}>
              Download your financial data in various formats for further analysis
            </Typography>
            <ReportExportButton userId={user?.userId} />
          </Card>
        </Grid>
      </Grid>

      {/* Summary Section */}
      {summary && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card
              sx={{
                p: 4,
                background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(255, 0, 110, 0.05) 100%)',
                border: '1px solid rgba(0, 212, 255, 0.1)',
                borderRadius: '16px',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <AssignmentIcon sx={{ color: '#ff006e', fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Financial Summary
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <StatItem
                    label="Total Spending"
                    value={`$${summary.totalSpending.toFixed(2)}`}
                    color="255, 23, 68"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <StatItem
                    label="Average Transaction"
                    value={`$${summary.averageTransaction.toFixed(2)}`}
                    color="0, 212, 255"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <StatItem
                    label="Transaction Count"
                    value={summary.transactionCount}
                    color="0, 255, 136"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <StatItem
                    label="Monthly Budget"
                    value={`$${summary.monthlyBudget.toFixed(2)}`}
                    color="255, 165, 0"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <StatItem
                    label="Remaining Budget"
                    value={`$${summary.remainingBudget.toFixed(2)}`}
                    color="0, 255, 136"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <StatItem
                    label="Budget Usage"
                    value={`${summary.spendingPercentage.toFixed(1)}%`}
                    color={summary.spendingPercentage > 100 ? '255, 165, 0' : '0, 255, 136'}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Reports;
