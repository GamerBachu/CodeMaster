
import { useAppSession } from "../../contexts";
import logger from "../../features/logger/logger.ts";

const Dashboard = () => {
  const appSession = useAppSession();
  logger.addDebug(
    "Dashboard component rendered",
    "Dashboard",
    "render",
    "", "",
    typeof appSession.info.account?.id === "number" ? appSession.info.account.id : Number(appSession.info.account?.id) || undefined
  );
  return (
    <div className="card m-1">
      <div className="card-header d-flex">
        <div className="h2 me-auto"  >
          {appSession.info.account?.name}
        </div>

      </div>
      <div className="card-body">
        <p>
          {appSession.info.account?.name}
        </p>
        <p>
          {appSession.info.account?.email}
        </p>
        <p>
          {appSession.info.account?.username}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
