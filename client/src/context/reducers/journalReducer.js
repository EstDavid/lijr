const getTags = (entries) => {
  const tags = new Set();
  entries.forEach((entry) => {
    entry.tags.forEach((tag) => {
      tags.add(tag);
    });
  });
  return tags;
};

function journalReducer (state, action) {
  switch (action.type) {
    case 'SET_ENTRIES':

      return {
        ...state,
        entries: action.payload,
        tags: getTags(action.payload),
      };
    case 'ADD_ENTRY': {
      const newEntries = [...state.entries, action.payload];
      return {
        ...state,
        entries: newEntries,
        tags: getTags(newEntries),
      };
    }
    case 'UPDATE_ENTRY': {
      const newEntries = state.entries.map((entry) =>
        entry._id === action.payload._id ? action.payload : entry
      );

      return {
        ...state,
        entries: newEntries,
        tags: getTags(newEntries),
      };
    }
    case 'REMOVE_ENTRY': {
      const newEntries = state.entries.filter(
        (entry) => entry._id !== action.payload
      );
      return {
        ...state,
        entries: newEntries,
        tags: getTags(newEntries),
      };
    }
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