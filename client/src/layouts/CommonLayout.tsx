import { Outlet } from "react-router";
import AppContainer from "../components/AppContainer";

const CommonLayout = () => {
  return (
    <AppContainer>
      <Outlet></Outlet>
    </AppContainer>
  );
};

export default CommonLayout;
