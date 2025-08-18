import { Navigate, Outlet } from "react-router";

const OnBoardLayout = ({ token, userData }) => {
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  if (userData?.isSessionComplete) {
    if (!userData?.isSubscriptionPaid) {
      return <Navigate to="/onboarding/subscription-plans" replace />;
    } else {
      return <Navigate to="/app/dashboard" replace />;
    }
  }

  return <Outlet />;
};

export default OnBoardLayout;
