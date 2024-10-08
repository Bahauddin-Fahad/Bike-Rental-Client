import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/Home/Home";
import BikeDetails from "../pages/Bikes/BikeDetails";
import AboutUs from "../pages/AboutUs/AboutUs";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Dashboard/Profile";
import AllBikes from "../pages/Bikes/AllBikes";
import UserRentals from "../pages/Dashboard/UserDashboard/UserRentals";
import UserManagement from "../pages/Dashboard/AdminDashboard/UserManagement";
import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/Error/ErrorPage";
import BikeManagement from "../pages/Dashboard/AdminDashboard/BikeManagement";
import RentalManagement from "../pages/Dashboard/AdminDashboard/RentalManagement";
import CouponManagement from "../pages/Dashboard/AdminDashboard/CouponManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },

      {
        path: "bikes/:id",
        element: (
          <ProtectedRoute>
            <BikeDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Profile /> },
          {
            path: "user/bikes",
            element: (
              <ProtectedRoute>
                <AllBikes />
              </ProtectedRoute>
            ),
          },

          {
            path: "user/rentals/unpaid",
            element: (
              <ProtectedRoute>
                <UserRentals />
              </ProtectedRoute>
            ),
          },
          {
            path: "user/rentals/paid",
            element: (
              <ProtectedRoute>
                <UserRentals />
              </ProtectedRoute>
            ),
          },
          {
            path: "admin/users",
            element: (
              <AdminRoute>
                <UserManagement />
              </AdminRoute>
            ),
          },
          {
            path: "admin/bikes",
            element: (
              <AdminRoute>
                <BikeManagement />
              </AdminRoute>
            ),
          },
          {
            path: "admin/rentals",
            element: (
              <ProtectedRoute>
                <RentalManagement />
              </ProtectedRoute>
            ),
          },
          {
            path: "admin/coupons",
            element: (
              <ProtectedRoute>
                <CouponManagement />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
