import React, { useState } from 'react';
import { Box, Button, CircularProgress, Alert } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderZipIcon from '@mui/icons-material/FolderZip';
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
    <Box>
      {error && (
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
          {error}
        </Alert>
      )}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} sx={{ color: '#f0f0ff' }} /> : <DescriptionIcon />}
          onClick={handleExportExcel}
          disabled={loading}
          sx={{
            py: 1.5,
            px: 3,
            background: 'linear-gradient(135deg, #00d4ff 0%, #00a8cc 100%)',
            fontWeight: 600,
            letterSpacing: '0.05em',
            boxShadow: '0 4px 20px rgba(0, 212, 255, 0.4)',
            '&:hover': {
              boxShadow: '0 8px 30px rgba(0, 212, 255, 0.6)',
              transform: 'translateY(-2px)',
            },
            '&:disabled': {
              opacity: 0.6,
            },
          }}
        >
          {loading ? 'Exporting...' : 'Export Excel'}
        </Button>
        <Button
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} sx={{ color: '#f0f0ff' }} /> : <FolderZipIcon />}
          onClick={handleExportPdf}
          disabled={loading}
          sx={{
            py: 1.5,
            px: 3,
            background: 'linear-gradient(135deg, #ff006e 0%, #ff3385 100%)',
            fontWeight: 600,
            letterSpacing: '0.05em',
            boxShadow: '0 4px 20px rgba(255, 0, 110, 0.4)',
            '&:hover': {
              boxShadow: '0 8px 30px rgba(255, 0, 110, 0.6)',
              transform: 'translateY(-2px)',
            },
            '&:disabled': {
              opacity: 0.6,
            },
          }}
        >
          {loading ? 'Exporting...' : 'Export PDF'}
        </Button>
      </Box>
    </Box>
  );
};

export default ReportExportButton;
