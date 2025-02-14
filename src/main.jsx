import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/variables.css";
import App from "./App.jsx";
import CreditFooter from "./components/CreditFooter.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <CreditFooter />
  </StrictMode>
);
