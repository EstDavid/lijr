import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage.jsx';
import entriesService from './services/entries';
import { Login } from './components/Login.jsx';
import { Signup } from './components/Signup.jsx';
import { Dashboard } from './components/Dashboard.jsx';

const App = () => {
  useEffect(() => {
    entriesService
      .getAll('65a2510c83350af0643d9ce0')
      .then((entries) => console.log(entries));
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
