import axios from "axios";

const API_URL = "http://localhost:8000";

export const createBrand = (name) =>
  axios.post(`${API_URL}/brands/`, { name });

export const getBrands = () =>
  axios.get(`${API_URL}/brands/`);

export const uploadNewsletter = (brand_id, content_type, file, content_text) => {
  const formData = new FormData();
  formData.append("brand_id", brand_id);
  formData.append("content_type", content_type);
  if (file) {
    formData.append("file", file);
  } else {
    formData.append("content_text", content_text);
  }
  return axios.post(`${API_URL}/newsletters/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const performAnalysis = (brand_id) =>
  axios.post(`${API_URL}/analysis/`, null, { params: { brand_id } });

export const getAnalysis = (brand_id) =>
  axios.get(`${API_URL}/analysis/${brand_id}`);
