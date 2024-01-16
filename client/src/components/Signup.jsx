import { useContext, useState } from 'react';
import { UserContext } from '@/context/contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import userService from '@/services/user';
import entriesService from '@/services/entries';
import { getInputDateFormat } from '../utils/entryFormats';
import InputField from './InputField';

// Signup component
const Signup = () => {
  const { dispatch, login } = useContext(UserContext);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [birthdate, setBirthdate] = useState(
    getInputDateFormat(new Date().setFullYear(new Date().getFullYear() - 18))
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      window.alert('Passwords do not match');
    }
    try {
      const userResponse = await userService.signup({
        email,
        password,
        firstName,
        birthdate
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(userResponse));

      login(dispatch, userResponse.user);

      userService.setToken(userResponse.token);
      entriesService.setToken(userResponse.token);

      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="signup" className="container signup-login">
      <form onSubmit={handleSignup}>
        <InputField
          label="signup-first-name"
          type="text"
          value={firstName}
          required={true}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <InputField
          label="signup-birthdate"
          type="date"
          value={birthdate}
          required={true}
          onChange={(e) => setBirthdate(e.target.value)}
        />
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
        <InputField
          label="signup-confirm-password"
          type="password"
          value={confirmPassword}
          required={true}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <button className="cancel">
          <Link to="/login">Already have an account?</Link>
        </button>
        <button className="submit" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
