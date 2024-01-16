const setTags = (dispatch, tags) => {
  dispatch({ type: 'SET_TAGS', payload: tags });
};

const addAspect = (dispatch, aspect) => {
  dispatch({ type: 'ADD_ASPECT', payload: aspect });
};

const removeAspect = (dispatch, aspect) => {
  dispatch({ type: 'REMOVE_ASPECT', payload: aspect });
};

const clearAspects = (dispatch) => {
  dispatch({ type: 'CLEAR_ASPECTS' });
};

const setTimelineFrom = (dispatch, timelineFrom) => {
  dispatch({ type: 'SET_TIMELINE_FROM', payload: timelineFrom });
};

const setTimelineTo = (dispatch, timelineTo) => {
  dispatch({ type: 'SET_TIMELINE_TO', payload: timelineTo });
};

const setVibrationMin = (dispatch, vibrationMin) => {
  dispatch({ type: 'SET_VIBRATION_MIN', payload: vibrationMin });
};

const setVibrationMax = (dispatch, vibrationMax) => {
  dispatch({ type: 'SET_VIBRATION_MAX', payload: vibrationMax });
};

export {
  setTags,
  addAspect,
  removeAspect,
  clearAspects,
  setTimelineFrom,
  setTimelineTo,
  setVibrationMin,
  setVibrationMax
};