function filtersReducer (state, action) {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case 'REMOVE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== action.payload._id
        ),
      };
    case 'CLEAR_CATEGORIES':
      return {
        ...state,
        categories: [],
      };
    case 'ADD_ASPECT':
      return {
        ...state,
        aspects: [...state.aspects, action.payload],
      };
    case 'REMOVE_ASPECT':
      return {
        ...state,
        aspects: state.aspects.filter(
          (aspect) => aspect._id !== action.payload._id
        ),
      };
    case 'CLEAR_ASPECTS':
      return {
        ...state,
        aspects: [],
      };
    case 'SET_TIMELINE_FROM':
      return {
        ...state,
        timelineFrom: action.payload,
      };
    case 'SET_TIMELINE_TO':
      return {
        ...state,
        timelineTo: action.payload,
      };
    case 'SET_VIBRATION_MIN':
      return {
        ...state,
        vibrationMin: action.payload,
      };
    case 'SET_VIBRATION_MAX':
      return {
        ...state,
        vibrationMax: action.payload,
      };
    default:
      return state;
  }
}

export default filtersReducer;