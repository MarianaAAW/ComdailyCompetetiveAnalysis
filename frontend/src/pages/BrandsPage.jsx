import React from 'react';
import BrandList from '../components/Brand/BrandList';
import BrandForm from '../components/Brand/BrandForm';

const BrandsPage = () => {
  return (
    <div>
      <h1>Brands</h1>
      <BrandForm />
      <BrandList />
    </div>
  );
};

export default BrandsPage;