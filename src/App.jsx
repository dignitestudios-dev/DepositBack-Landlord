import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/authentication/Login";
import { AuthRoute } from "./routes/authentication/AuthRoutes";
import { OnboardRoutes } from "./routes/onboarding/OnboardRoutes";
import { appRoutes } from "./routes/app/appRoutes";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import OnBoardLayout from "./layouts/OnBoardLayout";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  const { token, userData } = useContext(AppContext);
  console.log("🚀 ~ App ~ userData:", userData);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" />} />
      <Route path="auth" element={<AuthLayout token={token} />}>
        {AuthRoute?.map((Link, i) => (
          <Route path={Link.url} key={i} element={Link.page} />
        ))}
      </Route>
      <Route
        path="onboarding"
        element={<OnBoardLayout token={token} userData={userData} />}
      >
        {OnboardRoutes?.map((Link, i) => (
          <Route path={Link.url} key={i} element={Link.page} />
        ))}
      </Route>
      <Route path="app" element={<DashboardLayout />}>
        {appRoutes?.map((Link, i) => (
          <Route path={Link.url} key={i} element={Link.page} />
        ))}
      </Route>
      <Route
        path="*"
        element={<div className="text-7xl">Page Not Found</div>}
      />
    </Routes>
  );
}

export default App;
