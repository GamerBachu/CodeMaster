import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import "@bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import InitializeRoutes from "./routes/InitializeRoutes.tsx";
import { AppSessionProvider } from "./contexts/";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { ToastContainer } from "./components/toasts/index.ts";

 

createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <AppSessionProvider>
          <InitializeRoutes></InitializeRoutes>
        </AppSessionProvider>
      </BrowserRouter>
    </Provider>
  </>
);
