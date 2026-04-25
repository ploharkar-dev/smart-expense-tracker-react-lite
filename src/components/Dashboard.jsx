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
} from '@mui/material';
import { useTransactions } from '../context/TransactionContext';
import { useAuth } from '../context/AuthContext';
import TransactionForm from './TransactionForm.jsx';
import BudgetAlertWidget from './BudgetAlertWidget.jsx';
import PredictionChart from './PredictionChart.jsx';

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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.username}!
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <BudgetAlertWidget userId={user?.userId} monthlyBudget="10000" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>
              Summary
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              <Box>
                <Typography variant="body1">
                  Total Spending: ${summary?.totalAmount?.toFixed(2) || '0.00'}
                </Typography>
                <Typography variant="body1">
                  Average Transaction: ${summary?.averageAmount?.toFixed(2) || '0.00'}
                </Typography>
                <Typography variant="body1">
                  Transactions: {summary?.transactionCount || 0}
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TransactionForm categories={categories} onTransactionAdded={handleTransactionAdded} />
        </Grid>
        <Grid item xs={12} md={6}>
          <PredictionChart userId={user?.userId} />
        </Grid>
      </Grid>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Recent Transactions
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : transactions.length === 0 ? (
          <Alert severity="info">No transactions yet</Alert>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.slice(0, 10).map((txn) => (
                  <TableRow key={txn.txnId}>
                    <TableCell>{txn.txnDate}</TableCell>
                    <TableCell>{txn.categoryName}</TableCell>
                    <TableCell>{txn.description}</TableCell>
                    <TableCell align="right">${txn.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};

export default Dashboard;
