import React from 'react';
import './assets/styles/styles.scss';
import WelcomeFormWrapper from "./components/WelcomeFormWrapper";
import { AuthProvider } from "./context/AutnContext";

function App() {
  return (
    <AuthProvider>
      <WelcomeFormWrapper/>
    </AuthProvider>
  );
}

export default App;
