import React, { useMemo } from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import jsPDF from 'jspdf';

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

const getRandomScore = () => Math.floor(Math.random() * 5) + 1;

function generateBrandData() {
  return ATTRIBUTES_LEFT.map(attr => ({
    left: attr,
    right: ATTRIBUTES_RIGHT[ATTRIBUTES_LEFT.indexOf(attr)],
    ist: getRandomScore(),
    soll: getRandomScore()
  }));
}

function getTopBottomAttributes(data) {
  const sorted = [...data].sort((a, b) => a.ist - b.ist);
  return {
    top: sorted.slice(0, 3),
    bottom: sorted.slice(-3)
  };
}

const AnalysisResultPage = () => {
  const brandNames = [localStorage.getItem('brand1Name') || 'Brand 1', localStorage.getItem('brand2Name') || 'Brand 2'];
  const [brand1, brand2] = useMemo(() => [generateBrandData(), generateBrandData()], []);
  const brand1Attr = getTopBottomAttributes(brand1);
  const brand2Attr = getTopBottomAttributes(brand2);

  // Helper to get all saved analyses from localStorage
  const getSavedAnalyses = () => {
    try {
      const data = localStorage.getItem('savedAnalyses');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  };

  // Helper to save a new analysis to localStorage
  const saveAnalysis = (analysis) => {
    const analyses = getSavedAnalyses();
    analyses.push(analysis);
    localStorage.setItem('savedAnalyses', JSON.stringify(analyses));
  };

  const handleDownload = () => {
    const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
    doc.setFont('helvetica');
    doc.setFontSize(18);
    doc.text('Analysis Results', 40, 40);
    [brand1, brand2].forEach((brand, idx) => {
      const x = idx === 0 ? 40 : 320; // Move right brand closer for A4 landscape
      doc.setFontSize(16);
      doc.text(brandNames[idx], x, 60);
      // Draw 1-5 scale above the circles, centered
      for (let i = 1; i <= 5; i++) {
        doc.setFontSize(11);
        doc.text(String(i), x + 120 + (i - 1) * 28 + 7, 85, { align: 'center' });
      }
      brand.forEach((attr, i) => {
        const y = 105 + i * 18;
        doc.setFontSize(10);
        doc.text(attr.left, x, y);
        // Draw circles for scale
        for (let j = 1; j <= 5; j++) {
          doc.setDrawColor(180);
          doc.circle(x + 120 + (j - 1) * 28 + 7, y - 3, 7);
          if (attr.ist === j) {
            doc.setFillColor(25, 118, 210); // blue
            doc.circle(x + 120 + (j - 1) * 28 + 7, y - 3, 5, 'F');
          }
          if (attr.soll === j) {
            doc.setFillColor(255, 112, 67); // orange
            doc.circle(x + 120 + (j - 1) * 28 + 7, y - 3, 5, 'F');
          }
        }
        doc.text(attr.right, x + 120 + 5 * 28 + 20, y);
      });
      // Highest and lowest attributes
      const sorted = [...brand].sort((a, b) => a.ist - b.ist);
      doc.setFontSize(12);
      doc.text('Highest Ranked:', x, 900);
      sorted.slice(0, 3).forEach((attr, i) => {
        doc.setFontSize(10);
        doc.text(`${i + 1}. ${attr.left}`, x, 915 + i * 12);
      });
      doc.setFontSize(12);
      doc.text('Lowest Ranked:', x, 960);
      sorted.slice(-3).forEach((attr, i) => {
        doc.setFontSize(10);
        doc.text(`${i + 1}. ${attr.left} — Try to improve this attribute by focusing on related communication and actions.`, x, 975 + i * 12);
      });
    });
    doc.save('brand-analysis.pdf');
  };

  const handleSaveToDashboard = () => {
    // Save the current analysis data to localStorage
    const analysis = {
      timestamp: Date.now(),
      brandNames,
      brand1,
      brand2
    };
    saveAnalysis(analysis);
    localStorage.setItem('showDashboardAnalysis', 'true'); // legacy flag for compatibility
    window.location.href = '/brands';
  };

  return (
    <Box sx={{ p: 3, minHeight: '100vh', bgcolor: '#F8BBD0' }}>
      <Typography variant="h3" sx={{ fontFamily: 'Pacifico, cursive', color: '#C2185B', mb: 4, textAlign: 'center' }}>
        Analysis Results
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {[brand1, brand2].map((brand, idx) => (
          <Grid item xs={12} md={5} key={idx}>
            <Paper sx={{ p: 2, mb: 2, borderRadius: '20px', bgcolor: '#fff' }}>
              <Typography variant="h5" sx={{ fontFamily: 'Pacifico, cursive', color: '#C2185B', mb: 2, textAlign: 'center' }}>
                {brandNames[idx]}
              </Typography>
              {/* Numbers and circles in a column for perfect alignment */}
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
              <Typography variant="h6" sx={{ fontFamily: 'Pacifico, cursive', color: '#C2185B', mb: 2 }}>
                {brandNames[idx]}: Highest Ranked Attributes
              </Typography>
              {attrSet.top.map((attr, i) => (
                <Box key={i} sx={{ mb: 1 }}>
                  <b>{i+1}. {attr.left}</b>
                </Box>
              ))}
              <Typography variant="h6" sx={{ fontFamily: 'Pacifico, cursive', color: '#C2185B', mt: 3, mb: 2 }}>
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
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 6 }}>
        <Button variant="contained" onClick={handleDownload} sx={{ bgcolor: '#C5A3C5', color: '#fff', borderRadius: '20px', fontFamily: 'Pacifico, cursive', px: 4, fontSize: '1.1rem', boxShadow: 2, '&:hover': { bgcolor: '#C2185B' } }}>
          Download Analysis Results
        </Button>
        <Button variant="contained" onClick={handleSaveToDashboard} sx={{ bgcolor: '#C5A3C5', color: '#fff', borderRadius: '20px', fontFamily: 'Pacifico, cursive', px: 4, fontSize: '1.1rem', boxShadow: 2, '&:hover': { bgcolor: '#C2185B' } }}>
          Save to Dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default AnalysisResultPage;
