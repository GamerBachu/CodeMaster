
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import "@bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { AppSessionProvider } from "./contexts/";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { ToastContainer } from "./components/toasts/index.ts";
import AppLayout from "./layouts/AppLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <AppSessionProvider>
          <AppLayout>
          </AppLayout>
        </AppSessionProvider>
      </BrowserRouter>
    </Provider>
  </>
);
