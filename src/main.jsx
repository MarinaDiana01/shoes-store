import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Bootstrap CSS + JS
import "bootstrap/dist/css/bootstrap.min.css"; //Încărcă stilurile Bootstrap pentru toate componentele React.
import "bootstrap-icons/font/bootstrap-icons.css"; // pt a putea folosi iconurile din bootstrap

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
