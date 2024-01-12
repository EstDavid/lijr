import { createContext, useReducer } from 'react';

export const JournalContext = createContext();

const initialState = {
  uiState: {
    theme: 'dark',
    language: 'en'
  },
  user: {
    loggedIn: false,
    id: ''
  },
  journalData: {
    entries: []
  }
};

function reducer (state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        state, user: { ...state.user, loggedIn: true, id: action.user.id }
      };
    case 'CHANGE_THEME':
      return {
        state, uiState: { ...state.uiState, theme: action.theme }
      };
    default:
      return state;
  }
}

function JournalProvider (props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = (user) => {
    dispatch({ type: 'LOGIN', user });
  };

  const changeTheme = (theme) => {
    dispatch({ type: 'CHANGE_THEME', theme });
  };

  return (
    <JournalContext.Provider value={{ state, login, changeTheme }}>
      {props.children}
    </JournalContext.Provider>
  );
}

export default JournalProvider;
