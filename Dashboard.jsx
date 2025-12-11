function Dashboard({ onLogout }) {
  return (
    <div style={{ textAlign: "center", color: "white" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
        Welcome — You Are Logged In!
      </h1>

      <button
        onClick={onLogout}
        style={{
          padding: "10px 16px",
          backgroundColor: "#00b4ff",
          border: "none",
          color: "white",
          fontSize: "1rem",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
