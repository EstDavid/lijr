import PanelTitle from './PanelTitle';
import AspectControls from './AspectControls';
import NewEntryPanel from './NewEntryPanel';

// PanelHeader component
const PanelHeader = ({ type }) => (
  <div className={`panel-header container ${type}`}>
    <PanelTitle type={type} />
    {type === 'aspect' && <AspectControls />}
    <NewEntryPanel />
  </div>
);

export default PanelHeader;
