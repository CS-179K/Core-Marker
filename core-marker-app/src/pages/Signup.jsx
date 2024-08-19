import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/SignUp.css";
import logo from "../assets/logo.png"; // Adjust the path if needed

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful! Redirecting to login...");
        navigate("/"); // Navigate to the login page
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-page">
      <div className="flex justify-center">
        <img src={logo} alt="Core-Marker Logo" className="logo" />
      </div>
      <h1 className="title">Core-Marker</h1>
      <div className="signup-container">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email:</label>
            <input
              className="border-2 border-gray-600 rounded-md"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              className="border-2 border-gray-600 rounded-md"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p className="mt-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-white hover:underline"
          >
            Log In here
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
