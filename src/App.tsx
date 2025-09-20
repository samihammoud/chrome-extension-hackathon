import { useAuth } from "./hooks";
import { Authentication, Home, Loading } from "./components";
import "./App.css";

function App() {
  const {
    isAuthenticated,
    token,
    isLoading,
    authStatus,
    isCheckingAuth,
    handleOAuthLogin,
  } = useAuth();

  // Show loading screen while checking authentication
  if (isCheckingAuth) {
    return <Loading />;
  }

  // Show authentication screen if not authenticated
  if (!isAuthenticated) {
    return (
      <Authentication
        authStatus={authStatus}
        isLoading={isLoading}
        onLogin={handleOAuthLogin}
      />
    );
  }

  // Show home screen if authenticated
  return <Home token={token} />;
}

export default App;
