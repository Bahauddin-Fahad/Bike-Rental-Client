import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/Home/Home";
import BikeDetails from "../pages/Bikes/BikeDetails";
import AboutUs from "../pages/AboutUs/AboutUs";
import CompareBikes from "../pages/CompareBikes/CompareBikes";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Dashboard/Profile";
import AllBikes from "../pages/Bikes/AllBikes";
import UserBookings from "../pages/Dashboard/UserDashboard/UserBookings";
import UserManagement from "../pages/Dashboard/AdminDashboard/UserManagement";
import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/Error/ErrorPage";
import BikeManagement from "../pages/Dashboard/AdminDashboard/BikeManagement";
import BookingManagement from "../pages/Dashboard/AdminDashboard/BookingManagement";

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
        path: "compare",
        element: <CompareBikes />,
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
                <UserBookings />
              </ProtectedRoute>
            ),
          },
          {
            path: "user/rentals/paid",
            element: (
              <ProtectedRoute>
                <UserBookings />
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
                <BookingManagement />
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
