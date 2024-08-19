import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../components/Signup.css";
import logo from "../components/logo.png"; // Adjust path as needed

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Email:", email, "Password:", password);
    // Add your signup logic here

    navigate("/home"); // Redirect to home after signup
  };

  const handleLoginRedirect = () => {
    navigate("/login"); // Redirect to the Login page
  };

  return (
    <div className="signup-page">
      <img src={logo} alt="Core-Marker Logo" className="logo" />
      <h1 className="title">Core-Marker</h1>
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
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
          Already registered?{" "}
          <button
            onClick={handleLoginRedirect}
            className="text-blue-500 hover:underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
