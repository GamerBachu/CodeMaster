
import { useNavigate, useSearchParams } from 'react-router';
import { AppLoader } from '../../components/progress';
import { useAppSession } from '../../contexts';
import { useEffect } from 'react';
import appRoute, { appAuthRoute } from '../../routes/appRoute';
import sessionStorage from '../../utils/web/sessionStorage';
import { storageKey } from '../../constant';
import { validate } from '../../apis/accounts';

const Verify = () => {
  const appSession = useAppSession();
  const navigate = useNavigate();
  const [searchParams,] = useSearchParams();

  useEffect(() => {

    const sendToLogin = () => navigate(appRoute.LOGIN.path, { replace: true });
    const url = searchParams.get("url");
    if (url === undefined || url === null || url === "") {
      sendToLogin();
      return;
    }

    const urls = Object.values(appAuthRoute);
    const d = urls.some(v => url.startsWith(String(v.path)));


    if (d && !appSession.info.isAuthorized) {
      const tokenStorage = new sessionStorage(storageKey.tokenKey);
      const token = tokenStorage.get();
      if (token) {
        validate(token).then(account => {
          if (account) {
            const prev = appSession.info;
            appSession.setInfo({
              ...prev,
              account,
              isAuthorized: true,
              appToken: account.token,
            });
            navigate(url, { replace: true });
          }
          else {
            sendToLogin();
            return;
          }
        }).catch(() => {
          sendToLogin();
          return;
        });
      } else {
        sendToLogin();
        return;
      }
    }

  }, [appSession, appSession.info.isAuthorized, navigate, searchParams]);


  return (
    <AppLoader></AppLoader>
  );
};

export default Verify;