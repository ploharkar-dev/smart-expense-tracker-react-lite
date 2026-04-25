import React, { useState } from 'react';
import { Box, Button, CircularProgress, Alert } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import reportService from '../services/reportService';

const ReportExportButton = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleExportExcel = async () => {
    setLoading(true);
    setError('');
    try {
      const blob = await reportService.exportToExcel(userId);
      reportService.downloadFile(blob.data, `expense_report_${userId}.xlsx`);
    } catch (err) {
      setError('Failed to export Excel report');
    } finally {
      setLoading(false);
    }
  };

  const handleExportPdf = async () => {
    setLoading(true);
    setError('');
    try {
      const blob = await reportService.exportToPdf(userId);
      reportService.downloadFile(blob.data, `expense_report_${userId}.pdf`);
    } catch (err) {
      setError('Failed to export PDF report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {error && <Alert severity="error">{error}</Alert>}
      <Button
        variant="contained"
        startIcon={loading ? <CircularProgress size={20} /> : <GetAppIcon />}
        onClick={handleExportExcel}
        disabled={loading}
      >
        Export Excel
      </Button>
      <Button
        variant="contained"
        color="error"
        startIcon={loading ? <CircularProgress size={20} /> : <GetAppIcon />}
        onClick={handleExportPdf}
        disabled={loading}
      >
        Export PDF
      </Button>
    </Box>
  );
};

export default ReportExportButton;
