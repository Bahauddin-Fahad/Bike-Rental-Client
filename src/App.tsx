import Footer from "./components/layout/Footer";
import MainLayout from "./components/layout/MainLayout";
import Navbar from "./components/layout/Navbar";
import { useEffect, useState } from "react";
import "../src/styles/stylesheet.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const location = useLocation();
  const pathnames = [
    "/login",
    "/signup",
    "/dashboard",
    "/dashboard/bikes",
    "/dashboard/rentals/unpaid",
    "/dashboard/rentals/paid",
    "/dashboard/users",
    "/dashboard/admin/bikes",
  ];

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    AOS.init({
      duration: 1200, // Animation duration
    });
  }, []);
  return (
    <>
      {!pathnames.includes(location.pathname) && (
        <Navbar toggleTheme={toggleTheme} />
      )}
      <MainLayout />
      {!pathnames.includes(location.pathname) && <Footer />}
      <Toaster />
    </>
  );
}

export default App;
