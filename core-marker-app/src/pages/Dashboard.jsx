import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const history = useNavigate();
  const [quote, setQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");

  async function populateQuote() {
    const req = await fetch("http://localhost:5001/api/quote", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = await req.json();
    if (data.status === "ok") {
      console.log("quote has been set");
      setQuote(data.quote);
    } else {
      alert(data.error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history("/login");
    } else {
      const user = jwtDecode(token);
      if (!user) {
        localStorage.removeItem("token");
        history("/login");
      } else {
        populateQuote();
      }
    }
  }, [history]);

  async function updateQuote(event) {
    event.preventDefault();

    const req = await fetch("http://localhost:5001/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        quote: tempQuote,
      }),
    });

    const data = await req.json();
    if (data.status === "ok") {
      console.log("quote has been updated");
      setQuote(tempQuote);
      setTempQuote("");
    } else {
      alert(data.error);
      console.log("failed to update quote");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    history("/login");
  }

  return (
    <div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
      <h1>Your quote: {quote || "No quote found"}</h1>
      <form onSubmit={updateQuote}>
        <input
          type="text"
          placeholder="Quote"
          value={tempQuote}
          onChange={(e) => setTempQuote(e.target.value)}
        />
        <input type="submit" value="Update quote" />
      </form>
    </div>
  );
};

export default Dashboard;
