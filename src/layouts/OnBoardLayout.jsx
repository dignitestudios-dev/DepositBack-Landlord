import { Navigate, Outlet } from "react-router";

const OnBoardLayout = ({ token, userData }) => {
  console.log("🚀 ~ OnBoardLayout ~ userData:", userData);
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  if (userData?.isSessionComplete) {
    if (userData?.isSubscriptionPaid === false) {
      // return <Navigate to="/onboarding/subscription-plans" replace />;
    } else {
      return <Navigate to="/app/dashboard" replace />;
    }
  }

  return <Outlet />;
};

export default OnBoardLayout;
