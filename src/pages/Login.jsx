import { useState } from "react";

function Login({ onSwitchSignup, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    // For now: login success always goes to dashboard
    console.log("Logging in:", { username, password });

    setError("");
    onLoginSuccess();  // go to dashboard
  };

  return (
    <div className="login-card">
      <h1 className="login-title">Expense Tracker</h1>

      {error && <p className="login-error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label className="login-label">Username</label>
        <input
          className="login-input"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="login-label">Password</label>
        <input
          className="login-input"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" type="submit">
          Login
        </button>
      </form>

      <div className="login-footer">
        Don&apos;t have an account?{" "}
        <a onClick={onSwitchSignup}>Create account</a>
      </div>
    </div>
  );
}

export default Login;
