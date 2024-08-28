import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/Home/Home";
import BikeDetails from "../pages/Bikes/BikeDetails";
import AboutUs from "../pages/AboutUs/AboutUs";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import CompareBikes from "../pages/CompareBikes/CompareBikes";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Dashboard/Profile";
import AllBikes from "../pages/Bikes/AllBikes";
import BookingList from "../pages/Dashboard/UserDashboard/BookingList";

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
        path: "about",
        element: <AboutUs />,
      },

      {
        path: "bikes/:id",
        element: <BikeDetails />,
      },
      {
        path: "compare",
        element: <CompareBikes />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute role="user">
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Profile /> },
          {
            path: "bikes",
            element: <AllBikes />,
          },
          {
            path: "/dashboard/rentals/unpaid",
            element: (
              <ProtectedRoute role="user">
                <BookingList />
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/rentals/unpaid",
            element: (
              <ProtectedRoute role="user">
                <BookingList />
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/rentals/paid",
            element: (
              <ProtectedRoute role="user">
                <BookingList />
              </ProtectedRoute>
            ),
          },
          // {
          //   path: "slot-management",
          //   element: (
          //     <AdminRoute>
          //       <SlotManagement />{" "}
          //     </AdminRoute>
          //   ),
          // },
          // {
          //   path: "user-management",
          //   element: (
          //     <AdminRoute>
          //       <UserManagement />{" "}
          //     </AdminRoute>
          //   ),
          // },
          // {
          //   path: "userHome",
          //   element: <UserHome />,
          // },
          // {
          //   path: "past-bookings",
          //   element: <PastBooking />,
          // },
          // {
          //   path: "upcoming-bookings",
          //   element: <UpcomingBooking />,
          // },
          // {
        ],
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
]);

export default router;
