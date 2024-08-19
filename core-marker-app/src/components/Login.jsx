import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "./Login.css";
import logo from "./logo.png"; // Adjust the path according to where you placed the image

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);

    // Add your login logic here
    const isAuthenticated = true; // Replace this with your actual authentication logic

    if (isAuthenticated) {
      // Redirect to the home page after successful login
      navigate("/home");
    } else {
      // Handle login failure (e.g., show an error message)
      alert("Login failed! Please check your credentials.");
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
        <h2>Login</h2>
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
