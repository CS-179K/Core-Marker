import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import logo from "../assets/logo.png";

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
    navigate("/signup"); // Navigate to the Signup page
  };

  return (
    <div className="m-0 flex h-screen flex-col items-center justify-center">
      <div className="">
        <div className="rounded-md bg-gray-50 p-10">
          {/* <div className="flex justify-center">
            <img src={logo} alt="Core-Marker Logo" className="logo w-20" />
          </div> */}
          <div className="mb-2 font-semibold">Login to Your Account.</div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="text-sm">Email:</label>
            </div>
            <div>
              <input
                className="rounded-md border border-gray-400 py-2 pl-2 pr-20 focus:border-blue-400 focus:outline-none focus:ring-2"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@gmail.com"
              />
            </div>
            <div className="input-group">
              <label className="text-sm">Password:</label>
            </div>
            <div>
              <input
                className="rounded-md border border-gray-400 py-2 pl-2 pr-20 focus:border-blue-400 focus:outline-none focus:ring-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="password"
              />
            </div>
            <div className="mt-4 rounded-md bg-blue-400 py-2 text-center">
              <button className="text-white" type="submit">
                Login
              </button>
            </div>
          </form>
          <div className="py-4 text-center text-sm">or</div>
          <div>
            <p className="text-center text-sm">
              <button onClick={handleSignupRedirect} className="">
                Not Registered? Sign Up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
