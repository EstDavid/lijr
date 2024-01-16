import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UiContext } from '@/context/contexts/UiContext';
import { UserContext } from '@/context/contexts/UserContext';

// Header component
const DashboardHeader = () => {
  const {
    state: uiState,
    dispatch: uiDispatch,
    setTheme
  } = useContext(UiContext);
  const { dispatch: userDispatch, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignout = () => {
    window.localStorage.removeItem('loggedUser');
    logout(userDispatch);
    navigate('/');
  };

  return (
    <div id="dashboard-header" className="container">
      Header {uiState.theme}
      <button className="cancel" onClick={handleSignout}>
        Sign Out
      </button>
      <button onClick={() => setTheme(uiDispatch, 'es')}>Change Theme</button>
    </div>
  );
};

export default DashboardHeader;
