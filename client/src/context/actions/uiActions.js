const setTheme = (dispatch, theme) => {
  dispatch({ type: 'SET_THEME', payload: theme });
};

const setLanguage = (dispatch, language) => {
  dispatch({ type: 'SET_LANGUAGE', payload: language });
};

const setAspect = (dispatch, aspect) => {
  dispatch({ type: 'SET_ASPECT', payload: aspect });
};

const setCreatingEntry = (dispatch, creatingEntry) => {
  dispatch({ type: 'SET_CREATING_ENTRY', payload: creatingEntry });
};

export { setTheme, setLanguage, setAspect, setCreatingEntry };