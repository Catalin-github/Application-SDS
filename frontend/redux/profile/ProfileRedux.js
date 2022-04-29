/** @format */

const initialState = {
  loading: true,
  loaded: false,
  update: false,
  profileData: [],
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PROFILE_REQUEST':
      return {
        ...state,
        loading: true,
        leaded: false,
      };
    case 'PROFILE_SUCCESS':
      return {
        ...state,
        loading: false,
        loaded: true,
        update: !state.update,
        profileData: action.payload,
      };
    case 'PROFILE_OFFER_ADD': {
      for (let i = 0; i < state.profileData.length; i++) {
        if (state.profileData[i].projectId === action.payload.projectId) {
          state.profileData[i].offers.splice(0, Infinity, ...action.payload.res);
        }
      }
      return {
        ...state,
        loading: false,
        loaded: true,
        update: !state.update,
      };
    }

    case 'PROFILE_INVOICE_ADD': {
      for (let j = 0; j < state.profileData.length; j++) {
        if (state.profileData[j].projectId === action.payload.projectId) {
          state.profileData[j].orderProfileDto[0].invoiceProfileDto.splice(
            0,
            Infinity,
            ...action.payload.res,
          );
        }
      }
      return {
        ...state,
        loading: false,
        loaded: true,
        update: !state.update,
      };
    }
    case 'PROFILE_GUARANTEE_ADD': {
      for (let j = 0; j < state.profileData.length; j++) {
        if (state.profileData[j].projectId === action.payload.projectId) {
          state.profileData[j].orderProfileDto[0].guaranteeProfileDto.splice(
            0,
            Infinity,
            ...action.payload.res,
          );
        }
      }
      return {
        ...state,
        loading: false,
        loaded: true,
        update: !state.update,
      };
    }

    case 'PROFILE_IDENTITY_ADD': {
      for (let j = 0; j < state.profileData.length; j++) {
        if (state.profileData[j].projectId === action.payload.projectId) {
          state.profileData[j].orderProfileDto[0].identityProfileDto.splice(
            0,
            Infinity,
            ...action.payload.res,
          );
        }
      }
      return {
        ...state,
        loading: false,
        loaded: true,
        update: !state.update,
      };
    }
    case 'CLIENT_UPDATE_DATA': {
      state.profileData[0].clientDetails.splice(0, Infinity, ...action.payload);
      return {
        ...state,
        loading: false,
        loaded: true,
        update: !state.update,
      };
    }
    case 'JOURNAL_ADD_DATA': {
      state.profileData[0].journalReplies.splice(0, Infinity, ...action.payload);

      document.getElementById('scrollChat').scrollTop = document.getElementById(
        'scrollChat',
      ).scrollHeight;
      return {
        ...state,
        loading: false,
        loaded: true,
        update: !state.update,
      };
    }

    case 'UPDATE_PROFILE':
      return {
        ...state,
        update: !state.update,
      };

    default:
      return state;
  }
};

export default profileReducer;
