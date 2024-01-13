const login = (dispatch, user) => {
  dispatch({ type: 'LOGIN', payload: user });
};

const setError = (dispatch, error) => {
  dispatch({ type: 'SET_ERROR', payload: error });
};

const setLoading = (dispatch) => {
  dispatch({ type: 'SET_LOADING' });
};


export { login, setError, setLoading };
