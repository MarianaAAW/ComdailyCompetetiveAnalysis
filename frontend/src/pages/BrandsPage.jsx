import React, { useState, useEffect } from 'react';
import BrandList from '../components/Brand/BrandList';
import BrandForm from '../components/Brand/BrandForm';
import { Box, Typography, Paper, Grid } from '@mui/material';

const ATTRIBUTES_LEFT = [
  'Bodenständig', 'Familienorientiert', 'Kleinstädtisch', 'Ehrlich', 'Aufrichtig', 'Echt', 'Gesund', 'Ursprünglich',
  'Heiter', 'Gefühlvoll', 'Freundlich', 'Gewagt', 'Modisch', 'Aufregend', 'Temperamentvoll', 'Cool', 'Jung',
  'Fantasievoll', 'Einzigartig', 'Modern', 'Unabhängig', 'Zeitgemäß', 'Zuverlässig', 'Hart arbeitend', 'Sicher',
  'Intelligent', 'Technisch', 'Korporativ', 'Erfolgreich', 'Führend', 'Zuversichtlich', 'Edel', 'Glamourös',
  'Gut aussehend', 'Charmant', 'Weiblich', 'Weich', 'Naturverbunden', 'Männlich', 'Westlich', 'Taff'
];
const ATTRIBUTES_RIGHT = [
  'Eingebildet', 'Egoistisch', 'Großstädtisch', 'Unehrlich', 'Unaufrichtig', 'Unecht', 'Ungesund', 'Nachgemacht',
  'Traurig', 'Gefühllos', 'Unfreundlich', 'Sicher', 'Unmodisch', 'Langweilig', 'Temperamentlos', 'Uncool', 'Alt',
  'Fantasielos', 'Gewöhnlich', 'Altmodisch', 'Abhängig', 'Veraltet', 'Unzuverlässig', 'Faul', 'Unsicher',
  'Unklug', 'Manuell', 'Laienhaft', 'Erfolglos', 'Folgend', 'Nicht zuversichtlich', 'Unedel', 'Dezent',
  'Schlecht aussehend', 'Unhöflich', 'Männlich', 'Hart', 'Naturfern', 'Weiblich', 'Östlich', 'Schwach'
];

function getTopBottomAttributes(data) {
  const sorted = [...data].sort((a, b) => a.ist - b.ist);
  return {
    top: sorted.slice(0, 3),
    bottom: sorted.slice(-3)
  };
}

const AnalysisDisplay = ({ analysis }) => {
  const { brandNames, brand1, brand2, timestamp } = analysis;
  const brand1Attr = getTopBottomAttributes(brand1);
  const brand2Attr = getTopBottomAttributes(brand2);
  return (
    <Box sx={{ my: 4, p: 2, bgcolor: '#F8BBD0', borderRadius: '20px' }}>
      <Typography variant="h5" sx={{ color: '#C2185B', fontFamily: 'Pacifico, cursive', mb: 2 }}>
        Saved Analysis ({new Date(timestamp).toLocaleString()})
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {[brand1, brand2].map((brand, idx) => (
          <Grid item xs={12} md={5} key={idx}>
            <Paper sx={{ p: 2, mb: 2, borderRadius: '20px', bgcolor: '#fff' }}>
              <Typography variant="h6" sx={{ fontFamily: 'Pacifico, cursive', color: '#C2185B', mb: 2, textAlign: 'center' }}>
                {brandNames[idx]}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', mb: 1 }}>
                <Box sx={{ width: 120 }} />
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.1 }}>
                  {[1,2,3,4,5].map(val => (
                    <Box key={val} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 18 }}>
                      <Box sx={{ color: '#C2185B', fontWeight: 600, fontSize: 16 }}>{val}</Box>
                      <Box sx={{ height: 2 }} />
                    </Box>
                  ))}
                </Box>
                <Box sx={{ width: 120 }} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {brand.map((attr, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Box sx={{ width: 120, fontSize: 13, textAlign: 'right', pr: 1 }}>{attr.left}</Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                      {[1,2,3,4,5].map(val => (
                        <Box key={val} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 18 }}>
                          <Box sx={{ width: 14, height: 14, border: '1px solid #ccc', borderRadius: '50%', bgcolor: '#fff', position: 'relative' }}>
                            {attr.ist === val && <Box sx={{ width: 10, height: 10, bgcolor: '#1976d2', borderRadius: '50%', position: 'absolute', top: 2, left: 2 }} />}
                            {attr.soll === val && <Box sx={{ width: 10, height: 10, bgcolor: '#ff7043', borderRadius: '50%', position: 'absolute', top: 2, left: 2, opacity: attr.ist === val ? 0.5 : 1 }} />}
                          </Box>
                        </Box>
                      ))}
                    </Box>
                    <Box sx={{ width: 120, fontSize: 13, textAlign: 'left', pl: 1 }}>{attr.right}</Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={4} justifyContent="center">
        {[brand1Attr, brand2Attr].map((attrSet, idx) => (
          <Grid item xs={12} md={5} key={idx}>
            <Paper sx={{ p: 2, borderRadius: '20px', bgcolor: '#fff' }}>
              <Typography variant="subtitle1" sx={{ fontFamily: 'Pacifico, cursive', color: '#C2185B', mb: 2 }}>
                {brandNames[idx]}: Highest Ranked Attributes
              </Typography>
              {attrSet.top.map((attr, i) => (
                <Box key={i} sx={{ mb: 1 }}>
                  <b>{i+1}. {attr.left}</b>
                </Box>
              ))}
              <Typography variant="subtitle1" sx={{ fontFamily: 'Pacifico, cursive', color: '#C2185B', mt: 3, mb: 2 }}>
                Lowest Ranked & Suggestions
              </Typography>
              {attrSet.bottom.map((attr, i) => (
                <Box key={i} sx={{ mb: 1 }}>
                  <b>{i+1}. {attr.left}</b> — Try to improve this attribute by focusing on related communication and actions.
                </Box>
              ))}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const BrandsPage = () => {
  const [analyses, setAnalyses] = useState([]);

  useEffect(() => {
    // Load all saved analyses from localStorage
    const data = localStorage.getItem('savedAnalyses');
    if (data) {
      try {
        const arr = JSON.parse(data);
        if (Array.isArray(arr)) {
          // Do NOT sort in-place, as setAnalyses(arr.sort(...)) mutates the array in localStorage!
          const sorted = [...arr].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
          setAnalyses(sorted);
        } else {
          setAnalyses([]);
        }
      } catch {
        setAnalyses([]);
      }
    } else {
      setAnalyses([]);
    }
  }, []);

  return (
    <div>
      <h1>Brands</h1>
      <BrandForm />
      <BrandList />
      {analyses.length > 0 && (
        <div>
          <Typography variant="h4" sx={{ color: '#C2185B', fontFamily: 'Pacifico, cursive', mt: 4, mb: 2 }}>
            Saved Analyses
          </Typography>
          {analyses.map((analysis, idx) => (
            <AnalysisDisplay key={analysis.timestamp || idx} analysis={analysis} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandsPage;