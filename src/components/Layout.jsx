import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import QuickActions from "./QuickActions.jsx";

const Layout = () => {
  return (
    <>
      <Navbar />
      <QuickActions />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
