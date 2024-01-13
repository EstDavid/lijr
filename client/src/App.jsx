import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '@/context/contexts/UserContext';
import userService from '@/services/user';
import entriesService from '@/services/entries';

import Homepage from './components/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

const App = () => {
  const { dispatch, login } = useContext(UserContext);
  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'));

    if (loggedUser) {
      login(dispatch, loggedUser.user);

      userService.setToken(loggedUser.token);
      entriesService.setToken(loggedUser.token);

      entriesService.getAll().then((entries) => console.log(entries));
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
