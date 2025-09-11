import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { ToasterContainer } from "./components/global/Toaster.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import "../i18n.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <ToasterContainer />
        <App />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);
