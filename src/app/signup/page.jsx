// pages/signup.js

export default function Signup() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #3498db, #ffffff)",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          width: "300px",
        }}
      >
        <h2
          style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}
        >
          Sign Up
        </h2>
        <div>
          <label style={{ color: "black" }}>Full Name:</label>
          <input
            type="text"
            placeholder="Enter your full name"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "3px",
              color: "black", // Set text color to black
            }}
          />
        </div>
        <div>
          <label style={{ color: "black" }}>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "3px",
              color: "black", // Set text color to black
            }}
          />
        </div>
        <div>
          <label style={{ color: "black" }}>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "3px",
              color: "black", // Set text color to black
            }}
          />
        </div>
        <div>
          <label style={{ color: "black" }}>Confirm Password:</label>
          <input
            type="password"
            placeholder="Confirm your password"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "3px",
              color: "black", // Set text color to black
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
