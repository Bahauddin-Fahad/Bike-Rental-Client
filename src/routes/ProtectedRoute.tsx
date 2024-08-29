import { Navigate } from "react-router";
import React from "react";
import useUserDetails from "../customHooks/useUserDetails";
import Loading from "../components/ui/Loading";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { loadedUser, isLoading } = useUserDetails();

  if (isLoading) {
    return <Loading />;
  }

  if (loadedUser) {
    return children;
  }
  return <Navigate to="/login" replace={true} />;
};

export default PrivateRoute;
