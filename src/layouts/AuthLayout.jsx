import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";

const AuthLayout = ({ token }) => {
  const location = useLocation();
  const path = location.pathname;
  console.log("🚀 ~ AuthLayout ~ token:", token);
  if (token) {
    return <Navigate to="/app/Dashboard" replace />;
  }
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
