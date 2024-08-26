import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();
    console.log("Submitting login form with:", { email, password });
    const response = await fetch("http://localhost:5001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log(data.user);

    if (data.user) {
      localStorage.setItem("token", data.user);
      console.log("login successful");
      window.location.href = "/dashboard";
    } else {
      console.log("please check your username and password");
    }
  }

  function handleRedirectToRegister() {
    try {
      history("/register");
      console.log("redirecting to register");
    } catch (e) {
      console.error(`${e.name}: ${e.message}`);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <br />
        <input type="submit" value="Login" />

        <p>New user?</p>
        <button type="button" onClick={handleRedirectToRegister}>
          Sign up
        </button>
      </form>
    </div>
  );
}

export default App;
