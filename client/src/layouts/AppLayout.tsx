import AppContainer from "../components/AppContainer";
import HeaderContainer from "../components/HeaderContainer";
import InitializeRoutes from "../routes/InitializeRoutes";

const AppLayout = () => {
    return (
        <>
            <HeaderContainer></HeaderContainer>
            <AppContainer>
                <InitializeRoutes></InitializeRoutes>
            </AppContainer>
        </>
    );
};

export default AppLayout;

