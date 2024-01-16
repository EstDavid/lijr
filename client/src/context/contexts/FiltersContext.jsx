import { createContext, useReducer } from 'react';
import filtersReducer from '../reducers/filtersReducer';
import {
  setTags,
  addAspect,
  setSearchTerm,
  removeAspect,
  clearAspects,
  setTimelineFrom,
  setTimelineTo,
  setVibrationMin,
  setVibrationMax
} from '../actions/filtersActions';

const initialState = {
  tags: new Set([]),
  aspects: [],
  searchTerm: '',
  timelineFrom: null,
  timelineTo: null,
  vibrationMin: 0,
  vibrationMax: 1000
};

const FiltersContext = createContext();

const FiltersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filtersReducer, initialState);

  return (
    <FiltersContext.Provider
      value={{
        state,
        dispatch,
        setTags,
        addAspect,
        setSearchTerm,
        removeAspect,
        clearAspects,
        setTimelineFrom,
        setTimelineTo,
        setVibrationMin,
        setVibrationMax
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export { FiltersProvider, FiltersContext };
