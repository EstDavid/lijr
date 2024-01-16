import { createContext, useReducer } from 'react';
import uiReducer from '../reducers/uiReducer';
import {
  setTheme,
  setLanguage,
  setAspect,
  setCreatingEntry,
  setEditingEntry
} from '../actions/uiActions';

const initialState = {
  theme: 'dark',
  language: 'en',
  selectedAspect: null,
  creatingEntry: false,
  currentEntry: null
};

const UiContext = createContext();

const UiProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  return (
    <UiContext.Provider
      value={{
        state,
        dispatch,
        setTheme,
        setLanguage,
        setAspect,
        setCreatingEntry,
        setEditingEntry
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

export { UiProvider, UiContext };
