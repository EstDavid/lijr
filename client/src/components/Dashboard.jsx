import { useEffect } from 'react';
import entriesService from '@/services/entries';
import DashboardHeader from './Dashboard/DashboardHeader';
import Sidebar from './Dashboard/Layout/Sidebar/Sidebar';
import PanelDashboard from './Dashboard/PanelDashboard/PanelDashboard';

const Dashboard = () => {
  useEffect(() => {
    entriesService
      .getAll('65a2510c83350af0643d9ce0')
      .then((entries) => console.log(entries));
  }, []);
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
