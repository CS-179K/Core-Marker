import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "./logo.png";

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
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate("/home"); // Redirect to home on successful login
      } else {
        alert(data.message); // Display error message
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup"); // Navigate to the Signup page
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <img src={logo} alt="Core-Marker Logo" className="mb-6 w-24" />
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-4">
            <label className="mb-2 block text-left">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded border p-2"
            />
          </div>
          <div className="input-group mb-4">
            <label className="mb-2 block text-left">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded border p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Login
          </button>
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
