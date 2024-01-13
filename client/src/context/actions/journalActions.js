const setEntries = (dispatch, entries) => {
  dispatch({ type: 'SET_ENTRIES', payload: entries });
};

const addEntry = (dispatch, entry) => {
  dispatch({ type: 'ADD_ENTRY', payload: entry });
};

const updateEntry = (dispatch, entry) => {
  dispatch({ type: 'UPDATE_ENTRY', payload: entry });
};

const removeEntry = (dispatch, entry) => {
  dispatch({ type: 'REMOVE_ENTRY', payload: entry });
};

const setAspects = (dispatch, aspects) => {
  dispatch({ type: 'SET_ASPECTS', payload: aspects });
};

const addAspect = (dispatch, aspect) => {
  dispatch({ type: 'ADD_ASPECT', payload: aspect });
};

const updateAspect = (dispatch, aspect) => {
  dispatch({ type: 'UPDATE_ASPECT', payload: aspect });
};

const removeAspect = (dispatch, aspect) => {
  dispatch({ type: 'REMOVE_ASPECT', payload: aspect });
};

export {
  setEntries,
  addEntry,
  updateEntry,
  removeEntry,
  setAspects,
  addAspect,
  updateAspect,
  removeAspect
};