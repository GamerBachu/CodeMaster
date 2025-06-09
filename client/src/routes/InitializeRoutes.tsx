import About from "../pages/about/About";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/account/Login";
import Register from "../pages/account/Register";
import { Navigate, Route, Routes } from "react-router";

import Trending from "../pages/concerts/Trending";
import CommonLayout from "../layouts/CommonLayout";
import Dashboard from "../pages/dashboard/Dashboard";

const InitializeRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="/account/login" replace />} />

      <Route element={<CommonLayout />}>
        <Route path="account">
          <Route index path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="account">
          <Route path="trending" element={<Trending />} />
        </Route>
        <Route path="about" element={<About></About>}></Route>
        <Route path="Dashboard" element={<Dashboard />}></Route>
      </Route>
    </Routes>
  );
};

export default InitializeRoutes;
