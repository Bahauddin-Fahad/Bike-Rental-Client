import { ToastContainer } from "react-toastify";
import Footer from "./components/layout/Footer";
import MainLayout from "./components/layout/MainLayout";
import Navbar from "./components/layout/Navbar";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../src/styles/stylesheet.css";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
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
  return (
    <>
      <Navbar toggleTheme={toggleTheme} />
      <MainLayout />
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
