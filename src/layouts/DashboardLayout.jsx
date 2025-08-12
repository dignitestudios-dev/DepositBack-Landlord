import { Navigate, Outlet } from "react-router";

import Header from "../components/global/Header";
import Chatai from "../components/global/Chatai";
import Footer from "../components/global/Footer";

const DashboardLayout = ({ token, userData }) => {
  // if (!token) {
  //   return <Navigate to="/auth/login" replace />;
  // }

  // if (!userData?.isSessionComplete) {
  //   return <Navigate to="/onboarding/personal-info" replace />;
  // }

  // if (!userData?.isSubscriptionPaid) {
  //   return <Navigate to="/onboarding/subscription-plans" replace />;
  // }
  return (
    <div className="min-h-screen">
      <Header />
      <Outlet />
      <Chatai />
      <Footer />
    </div>
  );
};

export default DashboardLayout;
