import api from './api';

export const getBrands = async () => {
  const response = await api.get('/brands/');
  return response.data;
};

export const createBrand = async (brandData) => {
  const response = await api.post('/brands/', brandData);
  return response.data;
};

export const getBrandByName = async (name) => {
  const response = await api.get(`/brands/${name}`);
  return response.data;
};