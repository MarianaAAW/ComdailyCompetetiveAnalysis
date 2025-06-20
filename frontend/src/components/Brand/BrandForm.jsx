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

  return (
    <div>
      <h2>Create Brand</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BrandForm;