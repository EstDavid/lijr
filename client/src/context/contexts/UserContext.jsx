import { createContext, useReducer } from 'react';
import userReducer from '../reducers/userReducer';
import { login, setError, setLoading } from '../actions/userActions';

const initialState = {
  user: null,
  loading: true,
  error: true,
};

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider
      value={{ state, dispatch, login, setError, setLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
