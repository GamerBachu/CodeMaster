import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import "@bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import InitializeRoutes from "./routes/InitializeRoutes.tsx";
import { AppSessionProvider } from "./contexts/";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppSessionProvider>
        <InitializeRoutes></InitializeRoutes>
      </AppSessionProvider>
    </BrowserRouter>
  </StrictMode>
);
