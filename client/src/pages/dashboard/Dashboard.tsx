
import { useAppSession } from "../../contexts";

const Dashboard = () => {
  const appSession = useAppSession();

  console.log(appSession);

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
