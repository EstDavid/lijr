import { Link } from 'react-router-dom';

const Homepage = () => (
  <div id="homepage" className="container">
    Homepage
    <Link to="/login">Login</Link>
    <Link to="/signin">Sign In</Link>
    <Link to="/dashboard">Dashboard</Link>
  </div>
);

export default Homepage;
