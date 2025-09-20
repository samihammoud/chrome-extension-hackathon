import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoopingPlaceholder from "./LoopingPlaceholder";

interface SearchInputProps {
  val: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  val,
  onChange,
  onSubmit,
  isLoading = false,
}) => {
  const handleSubmit = () => {
    if (val.trim()) {
      onSubmit();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <TextField
        id="search-input"
        multiline
        rows={4}
        placeholder=""
        value={val}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyPress}
        style={{ width: "100%" }}
        variant="outlined"
        disabled={isLoading}
      />

      {/* Animated placeholder overlay - shows when no input */}
      {!val && (
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            right: "16px",
            pointerEvents: "auto",
            color: "#666",
            fontSize: "16px",
            lineHeight: "1.5",
            zIndex: 1,
            cursor: "text",
          }}
          onClick={() => {
            // Focus the TextField when overlay is clicked
            const textField = document.getElementById("search-input");
            if (textField) {
              textField.focus();
            }
          }}
        >
          <LoopingPlaceholder />
        </div>
      )}

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!val.trim() || isLoading}
        style={{
          marginTop: "10px",
          backgroundColor: "#646cff",
          color: "white",
        }}
      >
        {isLoading ? "Sending..." : "Send Query"}
      </Button>
    </div>
  );
};

export default SearchInput;
