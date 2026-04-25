import apiClient from './api';

const predictionService = {
  generateForecast: (userId) => {
    return apiClient.post(`/predictions/run?userId=${userId}`);
  },

  getAllForecasts: (userId) => {
    return apiClient.get(`/predictions/${userId}`);
  },

  getLatestForecast: (userId) => {
    return apiClient.get(`/predictions/${userId}/latest`);
  },

  predictNextMonth: (userId) => {
    return apiClient.get(`/predictions/${userId}/next-month`);
  },
};

export default predictionService;
