import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || !confirm) {
      setError("All fields are required.");
      setSuccess("");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setSuccess("");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }

    axios
      .post("http://localhost:5000/api/signup", { username, password }, { withCredentials: true })
      .then((res) => {
        setSuccess("Account successfully created!");
        setError("");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError("An error occured creating your account. Please try again.");
        setSuccess("");
      });
  };

  function onSwitch() {
    navigate("/");
  }

  return (
    <div className="page-wrapper">
      <div className="login-card">
        <h1 className="login-title">Create Account</h1>

        {error && <p className="login-error">{error}</p>}
        {success && <p style={{ color: "#7CFC00" }}>{success}</p>}

        <form onSubmit={handleSubmit}>
          <label className="login-label">Username</label>
          <input
            className="login-input"
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="login-label">Password</label>
          <input
            className="login-input"
            type="password"
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className="login-label">Confirm Password</label>
          <input
            className="login-input"
            type="password"
            placeholder="Re-enter your password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button className="login-button" type="submit">
            Create Account
          </button>
        </form>

        <div className="login-footer">
          Already have an account?{" "}
          <button className="link-btn" onClick={onSwitch}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
