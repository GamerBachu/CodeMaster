import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, NavLink } from "react-router";

import "@bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.tsx";
import InitializeRoutes from "./routes/InitializeRoutes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ul className="nav nav-pills">
        <li className="nav-item"><NavLink to="/" className="nav-link" end>Home</NavLink></li>
        <li className="nav-item"><NavLink to="/about" className="nav-link" end>about</NavLink></li>
        
        <li className="nav-item"><NavLink to="/account" className="nav-link" end>account</NavLink></li>
        <li className="nav-item"><NavLink to="/account/login" className="nav-link" end>login</NavLink></li>
        <li className="nav-item"><NavLink to="/account/register" className="nav-link" end>register</NavLink></li>


        <li className="nav-item"><NavLink to="/concerts" className="nav-link" end>concerts</NavLink></li>
        <li className="nav-item"><NavLink to="/concerts/delhi" className="nav-link" end>delhi</NavLink></li>
        <li className="nav-item"><NavLink to="/concerts/trending" className="nav-link" end>trending</NavLink></li>
         
      </ul>

      

      <InitializeRoutes></InitializeRoutes>
    </BrowserRouter>
  </StrictMode>
);
