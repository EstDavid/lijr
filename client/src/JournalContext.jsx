import { createContext, useReducer } from 'react';

export const JournalContext = createContext();

const initialState = {
  ui: {
    theme: 'dark',
    language: 'en',
  },
  user: {
    loggedIn: false,
    id: '',
  },
  journalData: {
    entries: [],
  },
};

function themeReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_THEME':
      return {
        ...state,
        theme: action.theme,
      };
    default:
      return state;
  }
}

function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loggedIn: true,
        id: action.user.id,
      };
    default:
      return state;
  }
}

function JournalProvider(props) {
  const [ui, dispatch] = useReducer(themeReducer, initialState.ui);
  const [user] = useReducer(userReducer, initialState.user);

  const userActions = {
    login: (user) => {
      dispatch({ type: 'LOGIN', user });
    },
  };

  const themeActions = {
    changeTheme: (theme) => {
      dispatch({ type: 'CHANGE_THEME', theme });
    },
  };

  return (
    <JournalContext.Provider value={{ user, ui, userActions, themeActions }}>
      {props.children}
    </JournalContext.Provider>
  );
}

export default JournalProvider;
