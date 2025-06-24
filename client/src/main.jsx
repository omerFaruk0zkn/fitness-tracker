import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme/theme-provider";
import App from "./App.jsx";

import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <App />
        <Toaster richColors closeButton duration={3000} />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
