import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBrandByName } from '../services/brandService';
import AnalysisDetail from '../components/Analysis/AnalysisDetail';
import NewsletterList from '../components/Newsletter/NewsletterList';

const BrandDetailPage = () => {
  const { brandId } = useParams();
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const data = await getBrandByName(brandId);
        setBrand(data);
      } catch (error) {
        console.error('Error fetching brand:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrand();
  }, [brandId]);

  if (loading) return <div>Loading brand details...</div>;
  if (!brand) return <div>Brand not found</div>;

  return (
    <div className="brand-detail-page">
      <h1>{brand.name}</h1>
      
      <section className="newsletters-section">
        <h2>Newsletters</h2>
        <NewsletterList brandId={brand.id} />
      </section>
      
      <section className="analysis-section">
        <h2>Analysis Results</h2>
        <AnalysisDetail brandId={brand.id} />
      </section>
    </div>
  );
};

export default BrandDetailPage;