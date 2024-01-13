function uiReducer (state, action) {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.payload,
      };
    case 'SET_ASPECT':
      return {
        ...state,
        selectedAspect: action.payload,
      };
    default:
      return state;
  }
}

export default uiReducer;