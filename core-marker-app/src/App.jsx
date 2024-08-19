/*import posts from "./data/posts";
import Post from "./components/Post";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="p-8">
      <Navbar />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.map((card, index) => (
          <Post
            key={index}
            title={card.title}
            content={card.content}
            image={card.image}
          />
        ))}
      </div>

      <footer></footer>
    </div>
  );
};

export default App;*/

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home"; // Assuming this contains your main content with posts

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;

