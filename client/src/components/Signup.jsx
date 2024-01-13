import { Link } from 'react-router-dom';
import userService from '@/services/user';
import entriesService from '@/services/entries';

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

export default Signup;
