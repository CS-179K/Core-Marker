import { Link } from "react-router-dom";
import "../components/Navbar.css"; // Optional custom styles

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-semibold">
          <Link to="/">Core-Marker</Link>
        </div>
        <div className="space-x-4">
          <Link
            to="/home"
            className="text-white hover:text-gray-400 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/post"
            className="text-white hover:text-gray-400 transition duration-300"
          >
            Post
          </Link>
          <Link
            to="/profile"
            className="text-white hover:text-gray-400 transition duration-300"
          >
            My Profile
          </Link>
          <Link
            to="/Feedback"
            className="text-white hover:text-gray-400 transition duration-300"
          >
             Form
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
