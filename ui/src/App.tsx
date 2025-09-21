import { useAuth } from "./hooks";
import { Authentication, Home, Loading } from "./components";
import CanvasPastePage from "./components/CanvasPastePage";
import "./App.css";
import { useState } from "react";

function App() {
  const {
    isAuthenticated,
    token,
    isLoading,
    authStatus,
    isCheckingAuth,
    handleOAuthLogin,
  } = useAuth();

  const [classesLoaded, setClassesLoaded] = useState(false);

  // Show loading screen while checking authentication
  if (isCheckingAuth) {
    return <Loading />;
  }

  // Show authentication screen if not authenticated
  if (!isAuthenticated) {
    setClassesLoaded(false);
    return (
      <Authentication
        authStatus={authStatus}
        isLoading={isLoading}
        onLogin={handleOAuthLogin}
      />
    );
  }

  if (isAuthenticated && !classesLoaded) {
    return <CanvasPastePage />;
    canvas paste page now after submitting, hits the api with the api key from the CanvasPastePage
    and then sets the classesLoaded state to true if the reponse is a success and classes are loaded
  }

  //home should be passed the token and the classes array
  return <Home token={token} />;
}

export default App;
