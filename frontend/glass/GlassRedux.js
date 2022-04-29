/** @format */

const initialState = {
  loading: true,
  loaded: false,
  glassData: '',
  update: false,
};

const glassReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GLASS_LOADING':
      return {
        ...state,
        loading: true,
        loaded: false,
        update: !state.update,
      };
    case 'GLASS_SUCCESS':
      return {
        ...state,
        loading: false,
        loaded: true,
        glassData: action.payload,
        update: !state.update,
      };
    case 'GLASS_EDIT': {
      var index = state.glassData.findIndex(x => x.glassId === action.payload.glassId);
      state.glassData.splice(index, 1, action.payload);
      return {
        ...state,
        update: !state.update,
      };
    }
    default:
      return state;
  }
};

export default glassReducer;
