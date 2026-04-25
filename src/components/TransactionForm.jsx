import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import { useTransactions } from '../context/TransactionContext';
import { useAuth } from '../context/AuthContext';

const TransactionForm = ({ categories, onTransactionAdded }) => {
  const [categoryId, setCategoryId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [txnDate, setTxnDate] = useState(new Date().toISOString().split('T')[0]);
  const [localError, setLocalError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { addTransaction, loading } = useTransactions();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setSuccessMessage('');

    if (!categoryId) {
      setLocalError('Please select a category');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setLocalError('Please enter a valid amount');
      return;
    }
    if (!description.trim()) {
      setLocalError('Please enter a description');
      return;
    }

    try {
      await addTransaction({
        userId: user.userId,
        categoryId: parseInt(categoryId),
        amount: parseFloat(amount),
        description,
        txnDate,
      });
      setSuccessMessage('Transaction added successfully!');
      setCategoryId('');
      setAmount('');
      setDescription('');
      setTxnDate(new Date().toISOString().split('T')[0]);
      if (onTransactionAdded) onTransactionAdded();
    } catch (err) {
      setLocalError('Failed to add transaction');
    }
  };

  return (
    <Paper elevation={2} sx={{ padding: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add New Transaction
      </Typography>

      {localError && <Alert severity="error" sx={{ mb: 2 }}>{localError}</Alert>}
      {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

      <Box component="form" onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryId}
            label="Category"
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            {categories.map((cat) => (
              <MenuItem key={cat.categoryId} value={cat.categoryId}>
                {cat.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          margin="normal"
          inputProps={{ step: '0.01', min: '0' }}
          required
        />

        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          multiline
          rows={2}
          required
        />

        <TextField
          fullWidth
          label="Date"
          type="date"
          value={txnDate}
          onChange={(e) => setTxnDate(e.target.value)}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          type="submit"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Transaction'}
        </Button>
      </Box>
    </Paper>
  );
};

export default TransactionForm;
