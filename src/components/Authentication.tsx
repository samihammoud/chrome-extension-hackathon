import React from "react";

interface AuthenticationProps {
  authStatus: string;
  isLoading: boolean;
  onLogin: () => void;
}

const Authentication: React.FC<AuthenticationProps> = ({
  authStatus,
  isLoading,
  onLogin,
}) => {
  return (
    <div style={{ width: "400px", padding: "20px" }}>
      <h1>Chrome Extension OAuth2 Demo</h1>
      <div className="card">
        <h2>Authentication</h2>
        <p>Status: {authStatus}</p>
        <button
          onClick={onLogin}
          disabled={isLoading}
          style={{
            padding: "10px 20px",
            backgroundColor: isLoading ? "#ccc" : "#646cff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Authenticating..." : "Login with Google"}
        </button>
      </div>
    </div>
  );
};

export default Authentication;
