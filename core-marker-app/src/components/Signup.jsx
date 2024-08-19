import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Signup.css";
import logo from "./logo.png"; // Adjust path as needed

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

    navigate('/home'); // Redirect to home after signup
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to the Login page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src={logo} alt="Core-Marker Logo" className="w-24 mb-6" />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-4">
            <label className="block text-left mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="input-group mb-4">
            <label className="block text-left mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="input-group mb-4">
            <label className="block text-left mb-2">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
            Sign Up
          </button>
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


