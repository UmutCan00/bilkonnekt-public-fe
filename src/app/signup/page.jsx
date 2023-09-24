"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter verification code
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      if (step === 1) {
        // Step 1: Initiate email verification
        const response = await fetch("http://localhost:3500/api/auth/prereg", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_email: email,
          }),
        });

        if (response.ok) {
          // Verification email sent successfully
          setStep(2); // Move to step 2
        } else {
          // Handle errors, e.g., display an error message to the user
          console.error("Email verification initiation failed");
        }
      } else if (step === 2) {
        // Step 2: Complete registration
        const response = await fetch(
          "http://localhost:3500/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              password: password,
              password_confirm: password,
              email: email,
              verificationcode: verificationCode,
            }),
          }
        );

        if (response.ok) {
          // Registration successful, you can redirect the user or show a success message
          console.log("Registration successful");
          router.push("/login");
        } else {
          // Handle registration errors, e.g., display an error message to the user
          console.error("Registration failed");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
        {step === 1 && (
          <>
            <div>
              <label style={{ color: "black" }}>
                Email ending with bilkent.edu.tr:
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "3px",
                  color: "black",
                }}
              />
            </div>
            <button
              type="button"
              onClick={handleSignup}
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
              Initiate Verification
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <label style={{ color: "black" }}>Verification Code:</label>
            <input
              type="text"
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "3px",
                color: "black",
              }}
            />
            <div>
              <label style={{ color: "black" }}>Username:</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "3px",
                  color: "black",
                }}
              />
            </div>
            <div>
              <label style={{ color: "black" }}>Password:</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "3px",
                  color: "black",
                }}
              />
            </div>
            <button
              type="button"
              onClick={handleSignup}
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
              Complete Registration
            </button>
          </>
        )}
      </div>
    </div>
  );
}
