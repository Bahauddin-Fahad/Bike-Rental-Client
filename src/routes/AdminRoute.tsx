import { Navigate } from "react-router-dom";
import React from "react";
import useUserDetails from "../customHooks/useUserDetails";
import Loading from "../components/ui/Loading";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { loadedUser, isLoading } = useUserDetails();

  if (isLoading) {
    return <Loading />;
  }

  if (loadedUser && loadedUser?.role === "admin") {
    return children;
  }

  return <Navigate to="/login" replace={true} />;
};

export default AdminRoute;
