import React, { useState, useEffect } from 'react';
import { getBrands } from '../../services/brandService';

const BrandList = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const data = await getBrands();
      setBrands(data);
    };
    fetchBrands();
  }, []);

  return (
    <div>
      <h2>Brand List</h2>
      <ul>
        {brands.map(brand => (
          <li key={brand.id}>{brand.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BrandList;