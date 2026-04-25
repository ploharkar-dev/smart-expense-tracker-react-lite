import apiClient from './api';

const reportService = {
  exportToExcel: (userId) => {
    return apiClient.get(`/reports/export/excel?userId=${userId}`, {
      responseType: 'blob',
    });
  },

  exportToPdf: (userId) => {
    return apiClient.get(`/reports/export/pdf?userId=${userId}`, {
      responseType: 'blob',
    });
  },

  getReportSummary: (userId, monthlyBudget = 10000) => {
    return apiClient.get(`/reports/summary/${userId}?monthlyBudget=${monthlyBudget}`);
  },

  downloadFile: (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  },
};

export default reportService;
