import React, { useState } from 'react';
import { createBrand } from '../../services/brandService';

const BrandForm = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBrand({ name });
      setName('');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create brand');
    }
  };

  return null;
};

export default BrandForm;