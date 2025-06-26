import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router";
import { AppLoader } from "../components/progress";
import NotFound from "../pages/common/NotFound";

const About = lazy(() => import("../pages/about/About"));
const AuthLayout = lazy(() => import("../layouts/AuthLayout"));
const Login = lazy(() => import("../pages/account/Login"));
const Register = lazy(() => import("../pages/account/Register"));
const Trending = lazy(() => import("../pages/concerts/Trending"));
const CommonLayout = lazy(() => import("../layouts/CommonLayout"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));

const PlannerList = lazy(() =>
  import("../pages/planner").then((module) => ({ default: module.PlannerList }))
);
const PlannerCreate = lazy(() =>
  import("../pages/planner").then((module) => ({
    default: module.PlannerCreate,
  }))
);
const PlannerLUpdate = lazy(() =>
  import("../pages/planner").then((module) => ({
    default: module.PlannerLUpdate,
  }))
);
const PlannerLDelete = lazy(() =>
  import("../pages/planner").then((module) => ({
    default: module.PlannerLDelete,
  }))
);

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
          <Route path="Dashboard" element={<Dashboard />} />

          <Route path="planner">
            <Route index path="list" element={<PlannerList />} />
            <Route path="create/:id" element={<PlannerCreate />} />
            <Route path="update/:id" element={<PlannerLUpdate />} />
            <Route path="delete/:id" element={<PlannerLDelete />} />
          </Route>
        </Route>

        <Route element={<CommonLayout />}>
          <Route path="account">
            <Route index path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
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
