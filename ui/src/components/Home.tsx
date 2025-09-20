import React, { useState } from "react";
import SearchInput from "./SearchInput";
import { motion } from "framer-motion";
import { textAnimations } from "../styles/textStyles";

interface HomeProps {
  token: string | null;
}

const Home: React.FC<HomeProps> = ({ token }) => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
            course: "CS101", // You can make this dynamic later
            user_id: "12345", // You can make this dynamic later
            semester: "Fall 2024", // You can make this dynamic later
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

  return (
    <div style={{ width: "400px", padding: "20px" }}>
      <motion.h1 {...textAnimations.elegant}>Personal-Wizard</motion.h1>
      <div className="card">
        <SearchInput
          val={searchText}
          onChange={setSearchText}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        {/* {result && (
          <div
            style={{
              marginTop: "15px",
              padding: "10px",

              borderRadius: "4px",
            }}
          ></div>
        )} */}
      </div>
    </div>
  );
};

export default Home;
