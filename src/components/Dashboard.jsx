import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Alert,
  Card,
  Container,
} from '@mui/material';
import { useTransactions } from '../context/TransactionContext';
import { useAuth } from '../context/AuthContext';
import TransactionForm from './TransactionForm.jsx';
import BudgetAlertWidget from './BudgetAlertWidget.jsx';
import PredictionChart from './PredictionChart.jsx';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import PieChartIcon from '@mui/icons-material/PieChart';

const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
  <Card
    sx={{
      p: 3,
      background: `linear-gradient(135deg, rgba(${color}, 0.1) 0%, rgba(${color}, 0.05) 100%)`,
      border: `1px solid rgba(${color}, 0.2)`,
      borderRadius: '16px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)`,
        transition: 'left 0.5s',
      },
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: `0 12px 40px rgba(${color}, 0.2)`,
      },
      '&:hover::before': {
        left: '100%',
      },
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
      <Box
        sx={{
          p: 1.5,
          borderRadius: '12px',
          background: `rgba(${color}, 0.2)`,
          color: `rgb(${color})`,
        }}
      >
        <Icon sx={{ fontSize: 28 }} />
      </Box>
    </Box>
    <Typography variant="body2" sx={{ color: '#a0a0c0', mb: 1, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem', fontWeight: 600 }}>
      {title}
    </Typography>
    <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
      {value}
    </Typography>
    {subtitle && <Typography variant="caption" sx={{ color: '#7a7a9e' }}>{subtitle}</Typography>}
  </Card>
);

const Dashboard = () => {
  const { user } = useAuth();
  const { transactions, summary, loading, fetchTransactions, fetchSummary } =
    useTransactions();
  const [categories] = useState([
    { categoryId: 1, categoryName: 'Food & Dining' },
    { categoryId: 2, categoryName: 'Travel' },
    { categoryId: 3, categoryName: 'Utilities' },
    { categoryId: 4, categoryName: 'Entertainment' },
    { categoryId: 5, categoryName: 'Health & Fitness' },
    { categoryId: 6, categoryName: 'Shopping' },
    { categoryId: 7, categoryName: 'Education' },
    { categoryId: 8, categoryName: 'Other' },
  ]);

  useEffect(() => {
    if (user?.userId) {
      fetchTransactions(user.userId);
      fetchSummary(user.userId);
    }
  }, [user, fetchTransactions, fetchSummary]);

  const handleTransactionAdded = () => {
    if (user?.userId) {
      fetchTransactions(user.userId);
      fetchSummary(user.userId);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 3 }}>
        {/* Welcome Section */}
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
            }}
          >
            Welcome back, {user?.username}
          </Typography>
          <Typography variant="body1" sx={{ color: '#a0a0c0', fontSize: '1.1rem' }}>
            Here's your financial overview at a glance
          </Typography>
        </Box>

        {/* Statistics Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Spending"
              value={`$${summary?.totalAmount?.toFixed(2) || '0.00'}`}
              icon={AccountBalanceWalletIcon}
              color="0, 212, 255"
              subtitle="This month"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Average Transaction"
              value={`$${summary?.averageAmount?.toFixed(2) || '0.00'}`}
              icon={SwapHorizIcon}
              color="0, 255, 136"
              subtitle="Per transaction"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Transactions"
              value={summary?.transactionCount || 0}
              icon={PieChartIcon}
              color="255, 0, 110"
              subtitle="Total tracked"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Trending"
              value={`${((summary?.averageAmount || 0) * 1.2).toFixed(0)}%`}
              icon={TrendingUpIcon}
              color="255, 165, 0"
              subtitle="Projected increase"
            />
          </Grid>
        </Grid>

        {/* Main Content Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                p: 3,
                background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(255, 0, 110, 0.05) 100%)',
                border: '1px solid rgba(0, 212, 255, 0.1)',
                borderRadius: '16px',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                📊 Add New Transaction
              </Typography>
              <TransactionForm categories={categories} onTransactionAdded={handleTransactionAdded} />
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <BudgetAlertWidget userId={user?.userId} monthlyBudget="10000" />
          </Grid>
        </Grid>

        {/* Prediction Chart */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <PredictionChart userId={user?.userId} />
          </Grid>
        </Grid>

        {/* Recent Transactions */}
        <Card
          sx={{
            p: 3,
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(255, 0, 110, 0.05) 100%)',
            border: '1px solid rgba(0, 212, 255, 0.1)',
            borderRadius: '16px',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            💳 Recent Transactions
          </Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
              <CircularProgress sx={{ color: '#00d4ff' }} />
            </Box>
          ) : transactions.length === 0 ? (
            <Alert severity="info" sx={{ backgroundColor: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.3)' }}>
              No transactions yet. Add one to get started!
            </Alert>
          ) : (
            <TableContainer sx={{ borderRadius: '12px', overflow: 'hidden' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'rgba(0, 212, 255, 0.1)' }}>
                    <TableCell sx={{ fontWeight: 700, color: '#00d4ff' }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#00d4ff' }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#00d4ff' }}>Description</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700, color: '#00d4ff' }}>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.slice(0, 10).map((txn, idx) => (
                    <TableRow
                      key={idx}
                      sx={{
                        borderBottom: '1px solid rgba(0, 212, 255, 0.1)',
                        transition: 'all 0.3s',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 212, 255, 0.05)',
                        },
                      }}
                    >
                      <TableCell sx={{ color: '#a0a0c0' }}>
                        {new Date(txn.txnDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell sx={{ color: '#a0a0c0' }}>
                        {categories.find(c => c.categoryId === txn.categoryId)?.categoryName || 'Unknown'}
                      </TableCell>
                      <TableCell sx={{ color: '#a0a0c0' }}>{txn.description}</TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontWeight: 600,
                          color: '#ff1744',
                        }}
                      >
                        -${txn.amount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Card>
      </Box>
    </Container>
  );
};

export default Dashboard;
