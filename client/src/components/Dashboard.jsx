import { useContext } from 'react';
import { UiContext } from '@/context/contexts/UiContext';
import DashboardHeader from './Dashboard/DashboardHeader';
import EntryForm from './Dashboard/EntryForm';
import Sidebar from './Dashboard/Layout/Sidebar/Sidebar';
import PanelDashboard from './Dashboard/PanelDashboard/PanelDashboard';

const Dashboard = () => {
  const { state } = useContext(UiContext);

  return (
    <div>
      <DashboardHeader />
      <div id="dashboard-body" className="flex-row">
        <Sidebar />
        <PanelDashboard type="entries" />
        {state.creatingEntry ? <EntryForm /> : null}
      </div>
    </div>
  );
};

export default Dashboard;
