import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";

function Main() {
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

export default Main;
