import React from "react";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const RouteGuard = ({
  children
}: { children: React.ReactNode }) => {
  const jwt = localStorage.getItem("token");

  if (!jwt) {
    return <Navigate to="/" />
  }

  const decoded: { exp: number } = jwtDecode(jwt);

  if (new Date(decoded.exp * 1000) < new Date()) {
    localStorage.removeItem('token');
    return <Navigate to="/" />
  }
  
  return <>{children}</>;
};

export default RouteGuard;
