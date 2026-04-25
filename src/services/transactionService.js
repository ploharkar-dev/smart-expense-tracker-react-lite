import apiClient from './api';

const transactionService = {
  addTransaction: (userId, categoryId, amount, description, txnDate) => {
    return apiClient.post('/transactions/add', {
      userId,
      categoryId,
      amount,
      description,
      txnDate,
    });
  },

  getTransactions: (userId) => {
    return apiClient.get(`/transactions/${userId}`);
  },

  getTransactionsByDateRange: (userId, startDate, endDate) => {
    return apiClient.get(`/transactions/${userId}/range`, {
      params: { startDate, endDate },
    });
  },

  updateTransaction: (txnId, data) => {
    return apiClient.put(`/transactions/${txnId}`, data);
  },

  deleteTransaction: (txnId) => {
    return apiClient.delete(`/transactions/${txnId}`);
  },

  getTransactionSummary: (userId) => {
    return apiClient.get(`/transactions/${userId}/summary`);
  },

  getMonthlySpending: (userId, year, month) => {
    return apiClient.get(`/transactions/${userId}/monthly/${year}/${month}`);
  },
};

export default transactionService;
