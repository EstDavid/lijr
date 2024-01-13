import { DashboardHeader, Sidebar, PanelDashboard } from './App.jsx';

const Dashboard = () => (
  <div>
    <DashboardHeader />
    <div id="dashboard-body" className="flex-row">
      <Sidebar />
      <PanelDashboard type="entries" />
    </div>
  </div>
);

export default Dashboard;
