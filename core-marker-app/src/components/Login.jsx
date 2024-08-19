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
      navigate('/home');
    } else {
      // Handle login failure (e.g., show an error message)
      alert("Login failed! Please check your credentials.");
    }
  };

  const handleSignupRedirect = () => {
    navigate('/'); // Navigate to the Signup page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src={logo} alt="Core-Marker Logo" className="w-24 mb-6" />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
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
          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
            Login
          </button>
        </form>
        <p className="mt-4">
          Not Registered?{" "}
          <button
            onClick={handleSignupRedirect}
            className="text-blue-500 hover:underline"
          >
            Sign Up here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;


