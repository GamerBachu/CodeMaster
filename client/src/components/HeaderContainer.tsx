import { useAppSession } from "../contexts";
import NavbarContainer from "./navbar/NavbarContainer";
const HeaderContainer = () => {
  const appSession = useAppSession();

  const isValidUser = appSession?.info?.isAuthorized;

  if (isValidUser) return <NavbarContainer  />;
  else return <></>;
};

export default HeaderContainer;