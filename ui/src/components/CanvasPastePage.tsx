import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const CanvasPastePage: React.FC = () => {
  const [canvasToken, setCanvasToken] = useState("");

  const handleSubmit = () => {
    if (canvasToken.trim()) {
      // TODO: Handle the canvas token submission
      console.log("Canvas token submitted:", canvasToken);
    }
  };

  return (
    <Box sx={{ padding: "20px", width: "400px" }}>
      <TextField
        label="Canvas API Token"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        placeholder="Paste your Canvas API token here..."
        value={canvasToken}
        onChange={(e) => setCanvasToken(e.target.value)}
        sx={{ marginBottom: "10px" }}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!canvasToken.trim()}
        sx={{ backgroundColor: "#1976d2", color: "white" }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CanvasPastePage;
