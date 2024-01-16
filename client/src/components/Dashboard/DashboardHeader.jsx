import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/context/contexts/UserContext';

// Header component
const DashboardHeader = () => {
  const { dispatch: userDispatch, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignout = () => {
    window.localStorage.removeItem('loggedUser');
    logout(userDispatch);
    navigate('/');
  };

  return (
    <div id="dashboard-header" className="container">
      <button className="cancel" onClick={handleSignout}>
        Sign Out
      </button>
    </div>
  );
};

export default DashboardHeader;
