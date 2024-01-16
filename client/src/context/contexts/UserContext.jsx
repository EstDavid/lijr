import { createContext, useReducer } from 'react';
import userReducer from '../reducers/userReducer';
import { login, logout, setError, setLoading } from '../actions/userActions';

const initialState = {
  user: null,
  loading: false,
  error: false
};

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider
      value={{ state, dispatch, login, logout, setError, setLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
