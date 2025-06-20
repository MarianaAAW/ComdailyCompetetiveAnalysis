import api from './api';

export const createAnalysis = async (analysisData) => {
  const response = await api.post('/analysis/', analysisData);
  return response.data;
};

export const getAnalysisByBrand = async (brandId) => {
  const response = await api.get(`/analysis/brand/${brandId}`);
  return response.data;
};

// Add this to src/services/analysisService.js
export const getAnalysisById = async (id) => {
  const response = await api.get(`/analysis/${id}`);
  return response.data;
};