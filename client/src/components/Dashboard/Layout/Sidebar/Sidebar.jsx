import { Categories, Timeline, VibrationBar } from './App.jsx';

// Sidebar component
const Sidebar = () => (
  <div id="sidebar" className="container">
    <Categories />
    <Timeline />
    <VibrationBar />
  </div>
);

export default Sidebar;