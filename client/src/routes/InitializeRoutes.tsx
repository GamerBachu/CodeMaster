import  { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router";

const About = lazy(() => import("../pages/about/About"));
const AuthLayout = lazy(() => import("../layouts/AuthLayout"));
const Login = lazy(() => import("../pages/account/Login"));
const Register = lazy(() => import("../pages/account/Register"));
const Trending = lazy(() => import("../pages/concerts/Trending"));
const CommonLayout = lazy(() => import("../layouts/CommonLayout"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));

const InitializeRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
          <Route path="about" element={<About />} />
          <Route path="Dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default InitializeRoutes;
