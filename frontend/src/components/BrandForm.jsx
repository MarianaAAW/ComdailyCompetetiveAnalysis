import React, { useState } from "react";
import { createBrand, uploadNewsletter, performAnalysis } from "../api";
import { TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const BrandForm = ({ onAdd }) => {
  const [brandName, setBrandName] = useState("");
  const [brandId, setBrandId] = useState(null);
  const [contentType, setContentType] = useState("text");
  const [file, setFile] = useState(null);
  const [textContent, setTextContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateBrand = async () => {
    if (!brandName) return alert("Enter brand name");
    setLoading(true);
    try {
      const res = await createBrand(brandName);
      setBrandId(res.data.id);
      alert(`Brand ${brandName} created. Now upload newsletter.`);
    } catch (err) {
      alert(err.response?.data?.detail || "Error creating brand");
    }
    setLoading(false);
  };

  const handleUpload = async () => {
    if (!brandId) return alert("Create brand first");
    if (contentType === "text" && !textContent) return alert("Enter newsletter text");
    if (contentType !== "text" && !file) return alert("Upload a file");

    setLoading(true);
    try {
      await uploadNewsletter(brandId, contentType, file, textContent);
      alert("Newsletter uploaded. Now perform analysis.");
      onAdd();
    } catch (err) {
      alert("Upload failed");
    }
    setLoading(false);
  };

  const handleAnalysis = async () => {
    if (!brandId) return alert("Create brand first");
    setLoading(true);
    try {
      await performAnalysis(brandId);
      alert("Analysis performed successfully");
      onAdd();
    } catch (err) {
      alert("Analysis failed");
    }
    setLoading(false);
  };

  return (
    <Box sx={{ border: "1px solid #ccc", p: 3, borderRadius: 2, maxWidth: 500, mx: "auto", mb: 5 }}>
      <Typography variant="h6" gutterBottom>Add a Brand & Newsletter</Typography>
      <TextField
        label="Brand Name"
        variant="outlined"
        fullWidth
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
        disabled={!!brandId}
        sx={{ mb: 2 }}
      />
      {!brandId && (
        <Button variant="contained" onClick={handleCreateBrand} fullWidth disabled={loading}>
          Create Brand
        </Button>
      )}

      {brandId && (
        <>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="content-type-label">Newsletter Content Type</InputLabel>
            <Select
              labelId="content-type-label"
              value={contentType}
              label="Newsletter Content Type"
              onChange={(e) => setContentType(e.target.value)}
            >
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="pdf">PDF</MenuItem>
              <MenuItem value="doc">DOC</MenuItem>
            </Select>
          </FormControl>

          {contentType === "text" ? (
            <TextField
              label="Newsletter Text"
              multiline
              rows={4}
              fullWidth
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              sx={{ mb: 2 }}
            />
          ) : (
            <Button variant="contained" component="label" sx={{ mb: 2 }}>
              Upload File
              <input
                type="file"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
                accept={contentType === "pdf" ? ".pdf" : ".doc,.docx"}
              />
            </Button>
          )}

          <Button variant="contained" onClick={handleUpload} fullWidth disabled={loading} sx={{ mb: 2 }}>
            Upload Newsletter
          </Button>

          <Button variant="contained" color="success" onClick={handleAnalysis} fullWidth disabled={loading}>
            Perform Analysis
          </Button>
        </>
      )}
    </Box>
  );
};

export default BrandForm;
