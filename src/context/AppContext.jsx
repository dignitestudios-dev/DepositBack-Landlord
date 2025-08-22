import { createContext, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { useFetchData } from "../hooks/api/Get";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [update, setUpdate] = useState();
  const [token, setToken] = useState(() => Cookies.get("token"));

  const [userData, setUserData] = useState(() => {
    const cookieData = Cookies.get("user");
    return cookieData ? JSON.parse(cookieData) : null;
  });

  const loginContext = (data) => {
    if (data) {
      if (data?.token) {
        Cookies.set("token", data?.token);
        setToken(data?.token);
      }
      if (data?.user) {
        setUserData(data?.user);
        Cookies.set("user", JSON.stringify(data?.user));
      }
    }
  };

  const logoutContext = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setToken(null);
    setUserData(null);
    navigate("/auth/login");
  };

  const { data: notification, loading: isLoading } = useFetchData(
    `/notification`,
    {},
    1,
    update
  );

  return (
    <AppContext.Provider
      value={{
        token,
        loginContext,
        logoutContext,
        userData,
        notification,
        isLoading,
        setUpdate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
