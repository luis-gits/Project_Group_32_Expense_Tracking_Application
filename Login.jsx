import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    axios
      .post("http://localhost:5000/api/login", { username, password }, { withCredentials: true })
      .then((res) => {
        window.location.href = "http://localhost:5000/expenseTable";
        setError("");
      })
      .catch((error) => {
        console.log(error);
        setError("Error submitting form");
      });
  };

  function onSwitchSignup() {
    navigate("/signup");
  }

  return (
    <div className="page-wrapper">
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
          Don't have an account?{" "}
          <button className="link-btn" onClick={onSwitchSignup}>Create Account</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
