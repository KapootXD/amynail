import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import logo from "./assets/logo.png";

const root = createRoot(document.getElementById("root"));

const ensureFavicon = (href) => {
  const existing = document.querySelector("link[rel='icon']");
  if (existing) {
    existing.setAttribute("href", href);
    existing.setAttribute("type", "image/png");
    return;
  }

  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/png";
  link.href = href;
  document.head.appendChild(link);
};

ensureFavicon(logo);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
