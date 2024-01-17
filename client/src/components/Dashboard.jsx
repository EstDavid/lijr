import { useContext } from 'react';
import { UiContext } from '@/context/contexts/UiContext';
import EntryForm from './Dashboard/EntryForm';
import Sidebar from './Dashboard/Sidebar';
import PanelDashboard from './Dashboard/PanelDashboard/PanelDashboard';

const Dashboard = () => {
  const { state } = useContext(UiContext);

  return (
    <div>
      <div id="dashboard-body" className="flex-row">
        <Sidebar />
        <PanelDashboard type="entries" />
        {state.creatingEntry ? <EntryForm /> : null}
      </div>
    </div>
  );
};

export default Dashboard;
