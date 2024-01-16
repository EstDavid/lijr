import PanelHeader from './PanelHeader/PanelHeader';
import EntriesPanel from './EntriesPanel/EntriesPanel';

// PanelDashboard component
const PanelDashboard = () => {
  return (
    <div id="panel-dashboard">
      <PanelHeader />
      <EntriesPanel />
    </div>
  );
};

export default PanelDashboard;
