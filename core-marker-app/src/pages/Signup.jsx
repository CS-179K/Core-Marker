import { useState } from "react";
import { useNavigate } from "react-router-dom";
/// import logo from "../assets/logo.png"; // Adjust the path if needed

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
    <div className="m-0 h-screen">
      {/* <div className="flex justify-center">
        <img src={logo} alt="Core-Marker Logo" className="logo w-20" />
      </div> */}

      <div className="flex flex-col items-center justify-center border-4">
        <div className="rounded-md border-4 bg-slate-50 p-10">
          <div className="mb-6 text-center text-2xl">Core Marker</div>
          <div className="mb-2 font-semibold">Create an Account.</div>
          <form onSubmit={handleSubmit}>
            <div className="input-group"></div>
            <label>Email:</label>
            <div>
              <input
                className="r rounded-md border border-gray-400 py-2 pl-2 pr-20"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Password:</label>
            </div>
            <div>
              <input
                className="rounded-md border-2 border-gray-600"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Confirm Password:</label>
            </div>
            <div>
              <input
                className="rounded-md border-2 border-gray-600"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-4 border-2 text-center">
              <button className="p-1" type="submit">
                Sign Up
              </button>
            </div>
          </form>
          <div>
            <p className="mt-4">
              Already have an account? <br></br>
              <button
                onClick={() => navigate("/")}
                className="rounded-md border-2 border-gray-600 p-1"
              >
                Log In here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
