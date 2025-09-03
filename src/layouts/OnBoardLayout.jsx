import { Navigate, Outlet, useLocation } from "react-router";

const OnBoardLayout = ({ token, userData }) => {
  console.log("🚀 ~ OnBoardLayout ~ userData:", userData);
  const location = useLocation();
  const path = location.pathname;
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  if (
    !userData?.isSessionComplete &&
    !path.startsWith("/onboarding/personal-info")
  ) {
    return <Navigate to="/onboarding/personal-info" replace />;
  }

  if (userData?.isSessionComplete) {
    if (userData?.isSubscriptionPaid) {
      return <Navigate to="/app/dashboard" replace />;
    }
  }

  return <Outlet />;
};

export default OnBoardLayout;
