
import { useAppSession } from "../../contexts";

const Dashboard = () => {
  const appSession = useAppSession();

 

  return <div>Dashboard{ appSession.info.isAuthorized}</div>;
};

export default Dashboard;
