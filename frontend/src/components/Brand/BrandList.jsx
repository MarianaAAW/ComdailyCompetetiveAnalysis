import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
         <li key={brand.id}>
            <Link to={`/brands/${brand.id}`}>{brand.name}</Link>
         </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandList;