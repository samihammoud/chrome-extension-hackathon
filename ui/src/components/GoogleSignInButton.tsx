import React from "react";

interface GoogleSignInButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  size?: "small" | "medium" | "large";
  color?: "light" | "dark";
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onClick,
  disabled = false,
  isLoading = false,
  size = "medium",
  color = "light",
}) => {
  const getButtonStyles = () => {
    const baseStyles = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      border: "1px solid #dadce0",
      borderRadius: "8px",
      cursor: disabled || isLoading ? "not-allowed" : "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "all 0.2s ease",
      opacity: disabled || isLoading ? 0.6 : 1,
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    };

    // Size variations
    const sizeStyles = {
      small: { padding: "8px 12px", fontSize: "12px" },
      medium: { padding: "12px 16px", fontSize: "14px" },
      large: { padding: "16px 20px", fontSize: "16px" },
    };

    // Color variations
    const colorStyles = {
      light: {
        backgroundColor: "#fff",
        color: "#3c4043",
      },
      dark: {
        backgroundColor: "#1f1f1f",
        color: "#fff",
        border: "1px solid #5f6368",
      },
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...colorStyles[color],
    };
  };

  const getLogoSize = () => {
    const sizeMap = {
      small: "16",
      medium: "20",
      large: "24",
    };
    return sizeMap[size];
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !isLoading) {
      e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.15)";
    }
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !isLoading) {
      e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      style={getButtonStyles()}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {/* Google Logo SVG */}
      <svg width={getLogoSize()} height={getLogoSize()} viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>

      <span>{isLoading ? "Signing in..." : "Sign in with Google"}</span>
    </button>
  );
};

export default GoogleSignInButton;
