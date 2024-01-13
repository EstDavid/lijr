import { createContext, useReducer } from 'react';
import journalReducer from '../reducers/journalReducer';
import {
  setEntries,
  addEntry,
  updateEntry,
  removeEntry,
  setAspects,
  addAspect,
  updateAspect,
  removeAspect
} from '../actions/journalActions';

const initialState = {
  entries: [],
  aspects: []
};

const JournalContext = createContext();

const JournalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(journalReducer, initialState);

  return (
    <JournalContext.Provider value={{
      state,
      dispatch,
      setEntries,
      addEntry,
      updateEntry,
      removeEntry,
      setAspects,
      addAspect,
      updateAspect,
      removeAspect
    }}>
      {children}
    </JournalContext.Provider>
  );
};

export { JournalProvider, JournalContext };
