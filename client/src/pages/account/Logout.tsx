import { useEffect } from "react";
import { useAppSession, defaultSession } from "../../contexts";
import locale from "../../resources/index";
import LinkBackToHome from "../../components/LinkBackToHome";
import sessionStorage from "../../utils/web/sessionStorage";
import { storageKey } from "../../constant";
import apis from "../../apis";


const Logout = () => {

    const appSession = useAppSession();

    useEffect(() => {

        const storage = new sessionStorage(storageKey.tokenKey);

        storage.remove();

        const d = appSession.info;

        if (d.isAuthorized && d.account?.id !== undefined) {
            appSession.setInfo(defaultSession);
            apis.accounts.logout({
                id: Number(d.account.id),
                username: (d.account.username),
            });
        }


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