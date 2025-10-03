import { Suspense, type JSX } from "react";
import { Navigate, Route, Routes } from "react-router";
import { AppLoader } from "../components/progress";
import NotFound from "../pages/common/NotFound";
import Dashboard from "../pages/dashboard/Dashboard";
import {
  PlannerList,
  PlannerCreate,
  PlannerView,
  PlannerUpdate,
  PlannerDelete,
} from "../pages/planner";

import { PosList, PosCreate, PosUpdate } from "../features/pos";

import Login from "../pages/account/Login";
import Register from "../pages/account/Register";
import MigrationDB from "../pages/common/MigrationDB";
import { useAppSession } from "../contexts";
import Logout from "../pages/account/Logout";
import Profile from "../pages/account/Profile";
import Verify from "../pages/account/Verify";
import SampleCanvas from "../features/canvas-area/sample-canvas";

const PrivateRoute = ({ children }: { children: JSX.Element; }) => {
  const appSession = useAppSession();
  return appSession.info.isAuthorized ? (
    children
  ) : (
    <Navigate
      to={`/account/validating?url=${encodeURIComponent(
        window.location.pathname + window.location.search
      )}`}
      replace
    />
  );
};

const InitializeRoutes = () => (
  <Suspense fallback={<AppLoader />}>
    <Routes>
      {/* Public routes */}
      <Route path="account">
        <Route index path="validating/:url?" element={<Verify />} />
        <Route index path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="logout" element={<Logout />} />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="activity/migration/:q?" element={<MigrationDB />} />
      <Route path="not-found/:page?" element={<NotFound />} />

      {/* Private routes */}
      <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="planner">
        <Route
          index
          path="list/:q?"
          element={
            <PrivateRoute>
              <PlannerList />
            </PrivateRoute>
          }
        />
        <Route
          path="create/:id"
          element={
            <PrivateRoute>
              <PlannerCreate />
            </PrivateRoute>
          }
        />
        <Route
          path="view/:id"
          element={
            <PrivateRoute>
              <PlannerView />
            </PrivateRoute>
          }
        />
        <Route
          path="update/:id"
          element={
            <PrivateRoute>
              <PlannerUpdate />
            </PrivateRoute>
          }
        />
        <Route
          path="delete/:id"
          element={
            <PrivateRoute>
              <PlannerDelete />
            </PrivateRoute>
          }
        />
      </Route>

      <Route path="feature/pos">
        <Route
          index
          path="list/:q?"
          element={
            <PrivateRoute>
              <PosList />
            </PrivateRoute>
          }
        />
        <Route
          path="create/:id"
          element={
            <PrivateRoute>
              <PosCreate />
            </PrivateRoute>
          }
        />
        <Route
          path="update/:id"
          element={
            <PrivateRoute>
              <PosUpdate />
            </PrivateRoute>
          }
        />
      </Route>



      <Route path="feature/canvas-area">
        <Route
          index
          path="sample-canvas"
          element={
            <PrivateRoute>
              <SampleCanvas />
            </PrivateRoute>
          }
        />
        <Route
          path="create/:id"
          element={
            <PrivateRoute>
              <PosCreate />
            </PrivateRoute>
          }
        />
        <Route
          path="update/:id"
          element={
            <PrivateRoute>
              <PosUpdate />
            </PrivateRoute>
          }
        />
      </Route>

      {/* Default and catch-all */}
      <Route index element={<Navigate to="/account/login" replace />} />
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
    </Routes>
  </Suspense>
);

export default InitializeRoutes;
