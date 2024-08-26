import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:5001/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      history("/login");
    } else {
      console.log("could not sign in user");
    }
  }

  function handleRedirectToLogin() {
    try {
      history("/login");
      console.log("redirecting to login");
    } catch (e) {
      console.error(`${e.name}: ${e.message}`);
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
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
        <input type="submit" value="Register" />
        <p>Already have a account?</p>
        <button type="button" onClick={handleRedirectToLogin}>
          Sign in
        </button>
      </form>
    </div>
  );
}

export default App;
