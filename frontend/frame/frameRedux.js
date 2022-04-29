/** @format */

const initialState = {
  loading: true,
  loaded: false,
  frameData: '',
  update: false,
};

const frameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FRAME_LOADING':
      return {
        ...state,
        loading: true,
        loaded: false,
        update: !state.update,
      };
    case 'FRAME_SUCCESS':
      return {
        ...state,
        loading: false,
        loaded: true,
        frameData: action.payload,
        update: !state.update,
      };
    case 'FRAME_EDIT': {
      var index = state.frameData.findIndex(x => x.frameId === action.payload.frameId);
      state.frameData.splice(index, 1, action.payload);
      return {
        ...state,
        update: !state.update,
      };
    }
    default:
      return state;
  }
};

export default frameReducer;
