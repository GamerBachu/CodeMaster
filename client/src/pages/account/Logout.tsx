import { useEffect } from "react";
import { useAppSession, defaultSession } from "../../contexts";
import locale from "../../resources/index";
import LinkBackToHome from "../../components/LinkBackToHome";


const Logout = () => {

    const appSession = useAppSession();

    useEffect(() => {
        const d = appSession.info;
        if (d.isAuthorized)
            appSession.setInfo(defaultSession);
    }, [appSession]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
            <h1>{locale.logout}</h1>
            <h2>{locale.logoutMessage}</h2>
            <h5>
                <LinkBackToHome></LinkBackToHome>
            </h5>
        </div>
    );
};

export default Logout;