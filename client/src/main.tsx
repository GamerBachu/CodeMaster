import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import "@bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import InitializeRoutes from "./routes/InitializeRoutes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <InitializeRoutes></InitializeRoutes>
    </BrowserRouter>
  </StrictMode>
);
