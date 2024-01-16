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
    case 'SET_CREATING_ENTRY': {
      return {
        ...state,
        creatingEntry: action.payload,
      };
    }
    case 'SET_EDITING_ENTRY': {
      return {
        ...state,
        creatingEntry: true,
        currentEntry: action.payload,
      };
    }
    default:
      return state;
  }
}

export default uiReducer;