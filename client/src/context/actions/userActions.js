const login = (dispatch, user) => {
  dispatch({ type: 'SET_USER', payload: user });
};

const logout = (dispatch) => {
  dispatch({ type: 'REMOVE_USER' });
};

const setError = (dispatch, error) => {
  dispatch({ type: 'SET_ERROR', payload: error });
};

const setLoading = (dispatch) => {
  dispatch({ type: 'SET_LOADING' });
};


export { login, logout, setError, setLoading };
