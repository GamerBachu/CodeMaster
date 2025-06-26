import { useAppSession } from "../contexts";
import locale from "../resources";
import appRoute from "../routes/appRoute";
import { Link } from "react-router";

const LinkBackToHome = () => {
  const appSession = useAppSession();

  const backUrl = appSession.info.isAuthorized
    ? appRoute.DASHBOARD.path
    : appRoute.LOGIN.path;
  const backTxt = appSession.info.isAuthorized
    ? locale.link_Dashboard
    : locale.link_Login;

  return <Link to={backUrl}>{backTxt}</Link>;
};

export default LinkBackToHome;
