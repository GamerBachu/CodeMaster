import AppContainer from "../components/AppContainer";
import HeaderContainer from "../components/HeaderContainer";
import InitializeRoutes from "../routes/InitializeRoutes";

const AppLayout = () => {
    return (<AppContainer>
        <HeaderContainer></HeaderContainer>
        <InitializeRoutes></InitializeRoutes>
    </AppContainer>
    );
};

export default AppLayout;

