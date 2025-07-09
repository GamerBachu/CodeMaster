
import { useAppSession } from "../../contexts";

const Dashboard = () => {
  const appSession = useAppSession();

  console.log("Dashboard props", appSession.info);

  return <div>Dashboard</div>;
};

export default Dashboard;
