import React, { useState } from "react";
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
  const [isFocused, setIsFocused] = useState(false);
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
    <div
      style={{
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        id="search-input"
        multiline
        rows={4}
        placeholder=""
        value={val}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ width: "100%" }}
        variant="outlined"
        disabled={isLoading}
      />

      {/* Animated placeholder overlay - shows when no input and not focused */}
      {!val && !isFocused && (
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            pointerEvents: "auto",
            color: "#666",
            fontSize: "16px",
            lineHeight: "1.5",
            zIndex: 1,
            cursor: "text",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
          onClick={() => {
            // Focus the TextField when overlay is clicked
            setIsFocused(true);
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
          alignSelf: "flex-start",
        }}
      >
        {isLoading ? "Sending..." : "Send To Wizard"}
      </Button>
    </div>
  );
};

export default SearchInput;
