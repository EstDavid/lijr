import Tags from './Tags';
import Timeline from './Timeline';
import VibrationBar from './VibrationBar';

// Sidebar component
const Sidebar = () => (
  <div id="sidebar" className="container">
    <Tags />
    <Timeline />
    <VibrationBar />
  </div>
);

export default Sidebar;
