import Navbar from "../components/Navbar"; // Import Navbar
import { Outlet } from "react-router-dom"; // Import Outlet

export default function Root() {
  return (
    <>
      <Navbar /> {/* Include Navbar */}
      <main>
        <Outlet /> {/* Render the child routes here */}
      </main>
    </>
  );
}
