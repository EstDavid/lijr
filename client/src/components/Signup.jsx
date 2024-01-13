import { useContext } from 'react';
import { UserContext } from '@/context/contexts/UserContext';
import { Link } from 'react-router-dom';
import userService from '@/services/user';
import entriesService from '@/services/entries';

// Signup component
const Signup = () => {
  const { dispatch, login } = useContext(UserContext);

  const handleSignup = async () => {
    // event.preventDefault()
    try {
      const userResponse = await userService.signup({
        email: 'john@examples.com',
        password: 'password123',
        firstName: 'John',
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(userResponse));

      login(dispatch, userResponse.user);

      userService.setToken(userResponse.token);
      entriesService.setToken(userResponse.token);
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
