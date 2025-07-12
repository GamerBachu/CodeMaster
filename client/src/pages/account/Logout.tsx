import { useEffect } from "react";
import { useAppSession } from "../../contexts";



const Logout = () => {

    const appSession = useAppSession();

    useEffect(() => {

        setTimeout(() => {
            const d = appSession.info;
            appSession.setInfo({
                ...d,
                isAuthorized: false
            });
        }, 1000);

        return () => {

        };
    }, [appSession]);


    return (
        <div>Logout</div>
    );
};

export default Logout;