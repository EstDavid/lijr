function journalReducer (state, action) {
  switch (action.type) {
    case 'SET_ENTRIES':
      return {
        ...state,
        entries: action.payload,
      };
    case 'ADD_ENTRY':
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case 'UPDATE_ENTRY':
      return {
        ...state,
        entries: state.entries.map((entry) =>
          entry._id === action.payload._id ? action.payload : entry
        ),
      };
    case 'REMOVE_ENTRY':
      return {
        ...state,
        entries: state.entries.filter(
          (entry) => entry._id !== action.payload._id
        ),
      };
    case 'SET_ASPECTS':
      return {
        ...state,
        aspects: action.payload,
      };
    case 'ADD_ASPECT':
      return {
        ...state,
        aspects: [...state.aspects, action.payload],
      };
    case 'UPDATE_ASPECT':
      return {
        ...state,
        aspects: state.aspects.map((aspect) =>
          aspect._id === action.payload._id ? action.payload : aspect
        ),
      };
    case 'REMOVE_ASPECT':
      return {
        ...state,
        aspects: state.aspects.filter(
          (aspect) => aspect._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
}

export default journalReducer;