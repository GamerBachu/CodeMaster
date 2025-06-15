import { Outlet } from "react-router";
import AppContainer from "../components/AppContainer";
import HeaderContainer from "../components/HeaderContainer";

const AuthLayout = () => {
  return (
    <AppContainer>
      <HeaderContainer></HeaderContainer>
      <Outlet></Outlet>
    </AppContainer>
  );
};
export default AuthLayout;
