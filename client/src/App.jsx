// App component
const App = () => (
  <>
    <Homepage />
    <Login />
    <Signin />
    <Dashboard />
  </>
);

// Homepage component
const Homepage = () => (
  <div id="homepage" className="container">
    Homepage
  </div>
);

// Login component
const Login = () => (
  <div id="login" className="container">
    Login
  </div>
);

// Signin component
const Signin = () => (
  <div id="signin" className="container">
    Signin
  </div>
);

// Dashboard component
const Dashboard = () => (
  <div>
    <Layout />
    <PanelDashboard type="entries" />
    <PanelDashboard type="aspect" />
  </div>
);

// Layout component
const Layout = () => (
  <div id="layout" className="container">
    <Header />
    <Sidebar />
  </div>
);

// Header component
const Header = () => (
  <div id="header" className="container">
    Header
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
  <div className={`panel-dashboard container ${type}`}>
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
  <div className="new-entry-panel" className="container">
    {/* Your NewEntryPanel component code here */}
  </div>
);

// EntriesPanel component
const EntriesPanel = ({ type }) => (
  <div className={`entries-panel container ${type}`}>
    {[<Entry key="1" />, <Entry key="2" />, <Entry key="3" />]}
  </div>
);

// Entry component
const Entry = () => <div className="entry container">Entry</div>;

export default App;
