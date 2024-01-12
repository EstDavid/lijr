import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
);

// Homepage component
const Homepage = () => (
  <div id="homepage" className="container">
    Homepage
    <Link to="/login">Login</Link>
    <Link to="/signin">Sign In</Link>
    <Link to="/dashboard">Dashboard</Link>
  </div>
);

// Login component
const Login = () => (
  <div id="login" className="container">
    Login
    <Link to="/">Home</Link>
  </div>
);

// Signin component
const Signin = () => (
  <div id="signin" className="container">
    Signin
    <Link to="/">Home</Link>
  </div>
);

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

// Layout component
const Layout = () => (
  <div id="layout" className="">
    <Header />
    <Sidebar />
  </div>
);

// Header component
const DashboardHeader = () => (
  <div id="dashboard-header" className="container">
    Header
    <Link to="/">Sign Out</Link>
  </div>
);

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
