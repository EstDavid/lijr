import { Link } from 'react-router-dom';
import userService from './services/user';
import entriesService from './services/entries';

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

export default Login;
