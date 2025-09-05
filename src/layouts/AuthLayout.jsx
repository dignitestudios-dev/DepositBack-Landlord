import { Navigate, Outlet } from "react-router";

const AuthLayout = ({ token }) => {
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
