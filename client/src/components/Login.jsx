import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '@/context/contexts/UserContext';
import userService from '@/services/user';
import entriesService from '@/services/entries';
import InputField from './InputField';
import { JournalContext } from '@/context/contexts/JournalContext';

const Login = () => {
  const { dispatch: userDispatch, login } = useContext(UserContext);
  const { dispatch: entriesDispatch, setEntries } = useContext(JournalContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userResponse = await userService.login({
        email,
        password
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(userResponse));

      login(userDispatch, userResponse.user);

      userService.setToken(userResponse.token);
      entriesService.setToken(userResponse.token);

      entriesService.getAll().then((data) => {
        setEntries(entriesDispatch, data.entries);
        navigate('/');
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div id="login" className="container signup-login">
      <form onSubmit={handleLogin}>
        <InputField
          label="signup-email"
          type="email"
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="signup-password"
          type="password"
          value={password}
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="cancel">
          <Link to="/signup">{"Don't have an account?"}</Link>
        </button>
        <button className="submit" type="submit">
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
