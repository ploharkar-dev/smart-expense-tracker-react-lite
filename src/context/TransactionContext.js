import React, { createContext, useContext, useState, useCallback } from 'react';
import transactionService from '../services/transactionService';

const TransactionContext = createContext();

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within TransactionProvider');
  }
  return context;
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(null);

  const fetchTransactions = useCallback(async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await transactionService.getTransactions(userId);
      setTransactions(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch transactions');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addTransaction = useCallback(async (transactionData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await transactionService.addTransaction(
        transactionData.userId,
        transactionData.categoryId,
        transactionData.amount,
        transactionData.description,
        transactionData.txnDate
      );
      setTransactions((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add transaction');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTransaction = useCallback(async (txnId, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await transactionService.updateTransaction(txnId, data);
      setTransactions((prev) =>
        prev.map((t) => (t.txnId === txnId ? response.data : t))
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update transaction');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTransaction = useCallback(async (txnId) => {
    setLoading(true);
    setError(null);
    try {
      await transactionService.deleteTransaction(txnId);
      setTransactions((prev) => prev.filter((t) => t.txnId !== txnId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete transaction');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSummary = useCallback(async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await transactionService.getTransactionSummary(userId);
      setSummary(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch summary');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    transactions,
    summary,
    loading,
    error,
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    fetchSummary,
  };

  return (
    <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>
  );
};
