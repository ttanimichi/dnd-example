import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./styles/index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);
