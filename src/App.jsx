import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import "./index.css";

function App() {
  const [screen, setScreen] = useState("login"); 
  // login, signup, dashboard

  return (
    <div className="app-root">
      {screen === "login" && (
        <Login
          onSwitchSignup={() => setScreen("signup")}
          onLoginSuccess={() => setScreen("dashboard")}
        />
      )}

      {screen === "signup" && (
        <Signup
          onSwitchLogin={() => setScreen("login")}
        />
      )}

      {screen === "dashboard" && (
        <Dashboard onLogout={() => setScreen("login")} />
      )}
    </div>
  );
}

export default App;
