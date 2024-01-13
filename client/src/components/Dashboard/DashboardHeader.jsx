import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UiContext } from './context/contexts/UiContext';

// Header component
const DashboardHeader = () => {
  const { state, dispatch, setTheme } = useContext(UiContext);

  return (
    <div id="dashboard-header" className="container">
      Header {state.theme}
      <Link to="/">Sign Out</Link>
      <button onClick={() => setTheme(dispatch, 'es')}>Change Theme</button>
    </div>
  );
};

export default DashboardHeader;
