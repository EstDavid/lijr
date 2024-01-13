import DashboardHeader from './Dashboard/DashboardHeader';
import Sidebar from './Dashboard/Layout/Sidebar/Sidebar';
import PanelDashboard from './Dashboard/PanelDashboard/PanelDashboard';

const Dashboard = () => {
  return (
    <div>
      <DashboardHeader />
      <div id="dashboard-body" className="flex-row">
        <Sidebar />
        <PanelDashboard type="entries" />
      </div>
    </div>
  );
};

export default Dashboard;
