const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case 'REMOVE_USER':
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      };
    case 'SET_ERROR':
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        user: null,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
