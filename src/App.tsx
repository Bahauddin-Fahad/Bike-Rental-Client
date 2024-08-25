import { ToastContainer } from "react-toastify";
import Footer from "./components/layout/Footer";
import MainLayout from "./components/layout/MainLayout";
import Navbar from "./components/layout/Navbar";
import { useEffect, useState } from "react";

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
    // setTheme(localStorage.getItem("theme"));
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
