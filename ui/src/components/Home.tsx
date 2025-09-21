import React, { useState } from "react";
import SearchInput from "./SearchInput";
import DropDownButton from "./DropDownButton";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { textAnimations } from "../styles/textStyles";

interface HomeProps {
  token: string | null;
}

const Home: React.FC<HomeProps> = ({ token }) => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");

  const handleSubmit = async () => {
    if (!searchText.trim() || !token) return;

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5001/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: searchText,
          context: {
            course: selectedClass,
          },
          canvas_tokens: {
            access_token: "REPLACE_WITH_REAL_CANVAS_TOKEN",
          },
          google_tokens: {
            access_token: token,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }

    setSearchText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

  return (
    <div style={{ width: "400px", padding: "20px" }}>
      <motion.h1 {...textAnimations.elegant}>Personal-Wizard</motion.h1>
      <div>
        <SearchInput
          val={searchText}
          onChange={setSearchText}
          onKeyPress={handleKeyPress}
          isLoading={isLoading}
        />

        {/* Horizontal layout for submit button and dropdown */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "flex-start",
            marginTop: "10px",
          }}
        >
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!searchText.trim() || isLoading}
            style={{
              backgroundColor: "#1976d2",
              color: "white",
              flex: "0 0 auto",
            }}
          >
            {isLoading ? "Sending..." : "Send To Wizard"}
          </Button>
          {/*Needs to dynamically render based on classes pulled from API call*/}
          <DropDownButton
            title="Class Options"
            value={selectedClass}
            onChange={setSelectedClass}
            items={[
              { label: "CS101 - Introduction to Programming", value: "CS101" },
              { label: "CS203 - Data Structures", value: "CS203" },
              { label: "CS301 - Algorithms", value: "CS301" },
              { label: "MATH101 - Calculus", value: "MATH101" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
