import { Outlet } from "react-router";
import AppContainer from "../components/AppContainer";
import HeaderContainer from "../components/HeaderContainer";
import { useAppSession } from "../contexts";
import { useNavigate } from "react-router";
import appRoute from "../routes/appRoute";
import { useEffect, useState } from "react";
import { AppLoader } from "../components/progress";

const AuthLayout = () => {
  const appSession = useAppSession();
  const navigate = useNavigate();

  const [isLoginProgress, setIsLoginProgress] = useState<boolean>(false);

  useEffect(() => {
    if (!appSession.info.isAuthorized) {
      navigate(appRoute.LOGIN.path, { replace: true });
    } else setIsLoginProgress(true);
  }, [appSession.info.isAuthorized, navigate]);

  return (
    <AppContainer>
      {isLoginProgress ? (
        <>
          <HeaderContainer></HeaderContainer>
          <Outlet />
        </>
      ) : (
        <>
          <AppLoader></AppLoader>
        </>
      )}
    </AppContainer>
  );
};
export default AuthLayout;
