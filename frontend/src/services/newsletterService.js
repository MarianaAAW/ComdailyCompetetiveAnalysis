import api from './api';

export const createNewsletter = async (newsletterData) => {
  const response = await api.post('/newsletters/', newsletterData);
  return response.data;
};

export const getNewslettersByBrand = async (brandId) => {
  const response = await api.get(`/newsletters/brand/${brandId}`);
  return response.data;
};

export const deleteNewsletter = async (id) => {
  await api.delete(`/newsletters/${id}`);
};

export const getNewsletterStats = async (brandId) => {
  const response = await api.get(`/newsletters/stats/${brandId}`);
  return response.data;
};

export const getNewsletterById = async (id) => {
  const response = await api.get(`/newsletters/${id}`);
  return response.data;
};