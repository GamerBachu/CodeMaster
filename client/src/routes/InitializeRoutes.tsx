import { Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router";
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
import Login from "../pages/account/Login";
import Register from "../pages/account/Register";
import MigrationDB from "../pages/common/MigrationDB";
import { useAppSession } from "../contexts";
import appRoute from "./appRoute";
import Logout from "../pages/account/Logout";
import Profile from "../pages/account/Profile";
import { appAuthRoute } from "./appRoute";
import sessionStorage from "../utils/web/sessionStorage";
import { storageKey } from "../constant";
import { validate } from "../apis/accounts";

const InitializeRoutes = () => {
  const appSession = useAppSession();
  const navigate = useNavigate();

  useEffect(() => {
    const urls = Object.values(appAuthRoute);
    const d = urls.some(v => window.location.pathname.startsWith(String(v.path)));
    const sendToLogin = () => navigate(appRoute.LOGIN.path, { replace: true });

    if (d && !appSession.info.isAuthorized) {
      const tokenStorage = new sessionStorage(storageKey.tokenKey);
      const token = tokenStorage.get();
      if (token) {
        validate(token).then(account => {
          if (account) {
            const prev = appSession.info;
            appSession.setInfo({
              ...prev,
              account,
              isAuthorized: true,
              appToken: account.token,
            });
          }
          else sendToLogin();
        }).catch(() => { sendToLogin(); });
      } else sendToLogin();
    }

  }, [appSession, appSession.info.isAuthorized, navigate]);

  return (
    <Suspense fallback={<AppLoader></AppLoader>}>
      <Routes>
        <Route index element={<Navigate to="/account/login" replace />} />

        <Route path="dashboard" element={<Dashboard />} ></Route>

        <Route path="planner">
          <Route index path="list/:q?" element={<PlannerList />} ></Route>
          <Route path="create/:id" element={<PlannerCreate />}></Route>
          <Route path="view/:id" element={<PlannerView />}></Route>
          <Route path="update/:id" element={<PlannerUpdate />} ></Route>
          <Route path="delete/:id" element={<PlannerDelete />} ></Route>
        </Route>

        <Route path="account">
          <Route index path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="logout" element={<Logout />} />
          <Route path="profile" element={<Profile />} />
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
      </Routes>
    </Suspense>
  );
};

export default InitializeRoutes;
