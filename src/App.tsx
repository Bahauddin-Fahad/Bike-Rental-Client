import Footer from "./components/layout/Footer";
import MainLayout from "./components/layout/MainLayout";
import Navbar from "./components/layout/Navbar";
import { useEffect } from "react";
import "../src/styles/stylesheet.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useAppSelector } from "./redux/hooks";

function App() {
  const theme = useAppSelector((state) => state!.theme!.theme as string); // Get theme from Redux store
  const location = useLocation();
  const pathnames = [
    "/login",
    "/signup",
    "/dashboard",
    "/dashboard/user/bikes",
    "/dashboard/user/rentals/unpaid",
    "/dashboard/user/rentals/paid",
    "/dashboard/admin/users",
    "/dashboard/admin/bikes",
    "/dashboard/admin/rentals",
    "/dashboard/admin/coupons",
  ];

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
      {!pathnames.includes(location.pathname) && <Navbar />}
      <MainLayout />
      {!pathnames.includes(location.pathname) && <Footer />}
      <Toaster />
    </>
  );
}

export default App;
