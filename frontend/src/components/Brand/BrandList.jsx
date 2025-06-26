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

  return null;
};

export default BrandList;