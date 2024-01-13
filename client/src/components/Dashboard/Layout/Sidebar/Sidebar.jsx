import Categories from './Categories';
import Timeline from './Timeline';
import VibrationBar from './VibrationBar';

// Sidebar component
const Sidebar = () => (
  <div id="sidebar" className="container">
    <Categories />
    <Timeline />
    <VibrationBar />
  </div>
);

export default Sidebar;
