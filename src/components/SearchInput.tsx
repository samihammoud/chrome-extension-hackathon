import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
  placeholder = "Create a template for my next lecture",
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
    <div style={{ width: "100%" }}>
      <TextField
        id="search-input"
        multiline
        rows={4}
        placeholder={placeholder}
        value={val}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyPress}
        style={{ width: "100%" }}
        variant="outlined"
        disabled={isLoading}
      />

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
