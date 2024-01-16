import PanelTitle from './PanelTitle';
import NewEntryPanel from './NewEntryPanel';

// PanelHeader component
const PanelHeader = () => (
  <div className="panel-header container">
    <PanelTitle />
    <NewEntryPanel />
  </div>
);

export default PanelHeader;
