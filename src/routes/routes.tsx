import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/Home/Home";
import BikeDetails from "../pages/bikes/BikeDetails";
import AboutUs from "../pages/AboutUs/AboutUs";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProtectedRoute from "../components/layout/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "bikes/:id",
        element: <BikeDetails />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute role="user">
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
