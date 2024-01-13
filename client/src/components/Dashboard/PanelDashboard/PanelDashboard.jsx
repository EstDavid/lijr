import PanelHeader from './PanelHeader/PanelHeader';
import EntriesPanel from './EntriesPanel/EntriesPanel';

// PanelDashboard component
const PanelDashboard = ({ type }) => {
  return (
    <div id="panel-dashboard" className={`container ${type}`}>
      <PanelHeader type={type} />
      <EntriesPanel type={type} />
    </div>
  );
};

export default PanelDashboard;
