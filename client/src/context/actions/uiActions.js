const setTheme = (dispatch, theme) => {
  dispatch({ type: 'SET_THEME', payload: theme });
};

const setLanguage = (dispatch, language) => {
  dispatch({ type: 'SET_LANGUAGE', payload: language });
};

const setAspect = (dispatch, aspect) => {
  dispatch({ type: 'SET_ASPECT', payload: aspect });
};

export { setTheme, setLanguage, setAspect };