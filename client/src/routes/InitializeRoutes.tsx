import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import { AppLoader } from "../components/progress";
import NotFound from "../pages/common/NotFound";
import AuthLayout from "../layouts/AuthLayout";
import Trending from "../pages/concerts/Trending";
import Dashboard from "../pages/dashboard/Dashboard";
import About from "../pages/about/About";
import {
  PlannerList,
  PlannerCreate,
  PlannerView,
  PlannerUpdate,
  PlannerDelete,
} from "../pages/planner";
import CommonLayout from "../layouts/CommonLayout";
import Login from "../pages/account/Login";
import Register from "../pages/account/Register";
import MigrationDB from "../pages/common/MigrationDB";

const InitializeRoutes = () => {
  return (
    <Suspense fallback={<AppLoader></AppLoader>}>
      <Routes>
        <Route index element={<Navigate to="/account/login" replace />} />

        <Route element={<AuthLayout />}>
          <Route path="account">
            <Route path="trending" element={<Trending />} />
          </Route>
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="planner">
            <Route index path="list/:q?" element={<PlannerList />} />
            <Route path="create/:id" element={<PlannerCreate />} />
            <Route path="view/:id" element={<PlannerView />} />
            <Route path="update/:id" element={<PlannerUpdate />} />
            <Route path="delete/:id" element={<PlannerDelete />} />
          </Route>
        </Route>

        <Route element={<CommonLayout />}>
          <Route path="account">
            <Route index path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="activity/migration/:q?" element={<MigrationDB />}></Route>
          <Route path="not-found/:page?" element={<NotFound />}></Route>

          <Route
            path="*"
            element={
              <Navigate
                to={`/not-found?page=${encodeURIComponent(
                  window.location.pathname + window.location.search
                )}`}
              />
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default InitializeRoutes;
