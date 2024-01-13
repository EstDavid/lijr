import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { UiContext } from './context/contexts/UiContext';
import Homepage from './components/Homepage.jsx';
import userService from './services/user';
import entriesService from './services/entries';

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

// Login component
const Login = () => {
  const handleLogin = async () => {
    // event.preventDefault()
    try {
      const user = await userService.login({
        email: 'john@examples.com',
        password: 'password123',
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));

      userService.setToken(user.token);
      entriesService.setToken(user.token);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div id="login" className="container">
      <button onClick={handleLogin}>Login</button>
      <Link to="/">Home</Link>
    </div>
  );
};

// Signup component
const Signup = () => {
  const handleSignup = async () => {
    // event.preventDefault()
    try {
      const user = await userService.signup({
        email: 'john@examples.com',
        password: 'password123',
        firstName: 'John',
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));

      userService.setToken(user.token);
      entriesService.setToken(user.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="signup" className="container">
      <button onClick={handleSignup}>Signup</button>
      <Link to="/">Home</Link>
    </div>
  );
};

// Dashboard component
const Dashboard = () => (
  <div>
    <DashboardHeader />
    <div id="dashboard-body" className="flex-row">
      <Sidebar />
      <PanelDashboard type="entries" />
    </div>
  </div>
);

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

// Sidebar component
const Sidebar = () => (
  <div id="sidebar" className="container">
    <Categories />
    <Timeline />
    <VibrationBar />
  </div>
);

// Categories component
const Categories = () => (
  <div id="categories" className="">
    Categories
  </div>
);

// Timeline component
const Timeline = () => (
  <div id="timeline" className="">
    Timeline
  </div>
);

// VibrationBar component
const VibrationBar = () => (
  <div id="vibration-bar" className="">
    Vibration Bar
  </div>
);

// PanelDashboard component
const PanelDashboard = ({ type }) => (
  <div id="panel-dashboard" className={`container ${type}`}>
    <PanelHeader type={type} />
    <EntriesPanel type={type} />
  </div>
);

// PanelHeader component
const PanelHeader = ({ type }) => (
  <div className={`panel-header container ${type}`}>
    <PanelTitle type={type} />
    {type === 'aspect' && <AspectControls />}
    <NewEntryPanel />
  </div>
);

// PanelTitle component
const PanelTitle = ({ type }) => (
  <div className={`panel-title container ${type}`}>PanelTitle</div>
);

// AspectControls component
const AspectControls = () => (
  <div className="aspect-controls container">
    <Stats />
    <AspectForm />
  </div>
);

// Stats component
const Stats = () => (
  <div className="stats container">{/* Your Stats component code here */}</div>
);

// AspectForm component
const AspectForm = () => (
  <div className="aspect-form container">
    {/* Your AspectForm component code here */}
  </div>
);

// NewEntryPanel component
const NewEntryPanel = () => (
  <div className="new-entry-panel container">
    {/* Your NewEntryPanel component code here */}
  </div>
);

// EntriesPanel component
const EntriesPanel = ({ type }) => (
  <div id="entries-panel" className={`container ${type}`}>
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
    <Entry />
  </div>
);

// Entry component
const Entry = () => <div className="entry container">Entry</div>;

export default App;
