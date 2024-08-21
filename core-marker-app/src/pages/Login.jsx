import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Login.css";
import logo from "../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to the home page after successful login
        navigate("/home");
      } else {
        // Handle login failure
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleSignupRedirect = () => {
    navigate("/"); // Navigate to the Signup page
  };

  return (
    <div className="login-page">
      <div className="flex justify-center">
        <img src={logo} alt="Core-Marker Logo" className="logo" />
      </div>
      <h1 className="title">Core-Marker</h1>
      <div className="login-container">
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
          <button type="submit">Login</button>
        </form>
        <p className="mt-4">
          Not Registered?{" "}
          <button
            onClick={handleSignupRedirect}
            className="text-white hover:underline"
          >
            Sign Up here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;