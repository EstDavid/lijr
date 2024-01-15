import DashboardHeader from './Dashboard/DashboardHeader';
import EntryForm from './Dashboard/EntryForm';
import Sidebar from './Dashboard/Layout/Sidebar/Sidebar';
import PanelDashboard from './Dashboard/PanelDashboard/PanelDashboard';

const Dashboard = () => {
  const editing = false;

  return (
    <div>
      <DashboardHeader />
      <div id="dashboard-body" className="flex-row">
        <Sidebar />
        <PanelDashboard type="entries" />
        {editing ? <EntryForm /> : null}
      </div>
    </div>
  );
};

export default Dashboard;
