import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '@/context/contexts/UserContext';
import Tags from './Sidebar/Tags';
import Timeline from './Sidebar/Timeline';
import SearchBar from './Sidebar/SearchBar';

// Sidebar component
const Sidebar = () => {
  const { dispatch: userDispatch, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignout = () => {
    window.localStorage.removeItem('loggedUser');
    logout(userDispatch);
    navigate('/');
  };
  return (
    <div id="sidebar" className="container">
      <div className="filters-container">
        <SearchBar />
        <Tags />
        <Timeline />
      </div>
      <button className="signout" onClick={handleSignout}>
        Sign Out
      </button>
    </div>
  );
};

export default Sidebar;
