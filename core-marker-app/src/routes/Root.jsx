import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Root() {
  const location = useLocation();

  const hideNavbarPaths = ["/", "/signup"];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Outlet />
    </>
  );
}
