import { Route, Routes } from "react-router";
import "./App.css";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/authentication/Login";
import { AuthRoute } from "./routes/authentication/AuthRoutes";
import { OnboardRoutes } from "./routes/onboarding/OnboardRoutes";
import { appRoutes } from "./routes/app/appRoutes";

function App() {
  return (
    <Routes>
      <Route
        path="login"
        element={<Login/>}
      />

      <Route path="app">
        {appRoutes?.map((Link , i) => (
          <Route path={Link.url} key={i} element={Link.page} />
        ))}
      </Route>

      <Route path="auth" element={<AuthLayout />}>
        {AuthRoute?.map((Link , i) => (
          <Route path={Link.url} key={i} element={Link.page} />
        ))}
      </Route>

      <Route path="onboarding" >
        {OnboardRoutes?.map((Link , i) => (
          <Route path={Link.url} key={i} element={Link.page} />
        ))}
      </Route>

      <Route
        path="*"
        element={<Login/>}
      />
    </Routes>
  );
}

export default App;
