import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBrands } from '../services/brandService';
import { getAnalysisByBrand } from '../services/analysisService';
import AnalysisDetail from '../components/Analysis/AnalysisDetail';
import NewsletterList from '../components/Newsletter/NewsletterList';

const BrandDetailPage = () => {
  const { brandId } = useParams();
  const [brand, setBrand] = useState(null);
  const [analysisResults, setAnalysisResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch brand data
        const allBrands = await getBrands();
        const currentBrand = allBrands.find(b => b.id === parseInt(brandId));
        setBrand(currentBrand);
         // Fetch analysis data
         const analysisData = await getAnalysisByBrand(brandId);
         setAnalysisResults(analysisData);
      } catch (error) {
        console.error('Error fetching brand:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
        {analysisResults.length > 0 ? (
          <AnalysisDetail brandId={brand.id} analysisResults={analysisResults} />
        ) : (
          <p>No analysis results available for this brand yet</p>
        )}
      </section>
    </div>
  );
};

export default BrandDetailPage;