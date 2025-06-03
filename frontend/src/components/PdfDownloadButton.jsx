import React from 'react';
import jsPDF from 'jspdf';

function PdfDownloadButton({ data }) {
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Brand Analysis Report", 10, 10);
    data.attributes.forEach((attr, index) => {
      doc.text(`${attr.name}: ${attr.value}`, 10, 20 + index * 10);
    });
    doc.save("analysis_report.pdf");
  };

  return <button onClick={downloadPDF}>Download PDF</button>;
}

export default PdfDownloadButton;