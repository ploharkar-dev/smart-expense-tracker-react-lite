import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Card,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  InputAdornment,
} from '@mui/material';
import { useTransactions } from '../context/TransactionContext';
import { useAuth } from '../context/AuthContext';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
      setSuccessMessage('✓ Transaction added successfully!');
      setCategoryId('');
      setAmount('');
      setDescription('');
      setTxnDate(new Date().toISOString().split('T')[0]);
      setTimeout(() => setSuccessMessage(''), 3000);
      if (onTransactionAdded) onTransactionAdded();
    } catch (err) {
      setLocalError('Failed to add transaction');
    }
  };

  return (
    <Card sx={{
      padding: 3,
      background: 'linear-gradient(135deg, rgba(21, 29, 59, 0.8) 0%, rgba(21, 29, 59, 0.6) 100%)',
      border: '1px solid rgba(0, 212, 255, 0.15)',
      borderRadius: '16px',
    }}>
      {localError && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
            backgroundColor: 'rgba(255, 23, 68, 0.1)',
            borderColor: 'rgba(255, 23, 68, 0.3)',
            color: '#ff6b9d',
            border: '1px solid',
          }}
        >
          {localError}
        </Alert>
      )}
      {successMessage && (
        <Alert
          severity="success"
          sx={{
            mb: 2,
            backgroundColor: 'rgba(0, 255, 136, 0.1)',
            borderColor: 'rgba(0, 255, 136, 0.3)',
            color: '#00ff88',
            border: '1px solid',
          }}
          icon={<CheckCircleIcon />}
        >
          {successMessage}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Typography
          variant="subtitle2"
          sx={{
            color: '#a0a0c0',
            mb: 2.5,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: '0.75rem',
            fontWeight: 600,
          }}
        >
          Enter transaction details
        </Typography>

        <FormControl fullWidth sx={{ mb: 2.5 }}>
          <InputLabel sx={{ color: '#a0a0c0' }}>Category</InputLabel>
          <Select
            value={categoryId}
            label="Category"
            onChange={(e) => setCategoryId(e.target.value)}
            required
            sx={{
              color: '#f0f0ff',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 212, 255, 0.2)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 212, 255, 0.4)',
              },
            }}
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
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#f0f0ff',
            },
          }}
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
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#f0f0ff',
            },
          }}
        />

        <TextField
          fullWidth
          label="Date"
          type="date"
          value={txnDate}
          onChange={(e) => setTxnDate(e.target.value)}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#f0f0ff',
            },
          }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            py: 1.5,
            background: 'linear-gradient(135deg, #00d4ff 0%, #00a8cc 100%)',
            fontSize: '1rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            boxShadow: '0 4px 20px rgba(0, 212, 255, 0.4)',
            '&:hover': {
              boxShadow: '0 8px 30px rgba(0, 212, 255, 0.6)',
              transform: 'translateY(-2px)',
            },
          }}
          startIcon={<AddCircleIcon />}
          type="submit"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Add Transaction'}
        </Button>
      </Box>
    </Card>
  );
};

export default TransactionForm;
