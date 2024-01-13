import { PanelHeader, EntriesPanel } from './App.jsx';

// PanelDashboard component
const PanelDashboard = ({ type }) => (
  <div id="panel-dashboard" className={`container ${type}`}>
    <PanelHeader type={type} />
    <EntriesPanel type={type} />
  </div>
);

export default PanelDashboard;
