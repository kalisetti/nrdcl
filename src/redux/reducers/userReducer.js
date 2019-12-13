import {
  LOGIN,
  LOGOUT,
  SET_MODE,
  SET_PROFILE_SUBMITTED,
} from '../actions/actionTypes';

const initialState = {
  username: null,
  logged_in: false,
  profile_verified: false,
  api_key: null,
  api_secret: null,
  blacklisted: null,
  first_name: null,
  login_id: null,
  mobile_no: null,
  mode_preference: null,
  profile_submitted: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.payload,
        logged_in: true,
      };

    case LOGOUT:
      return {
        ...state,
        ...initialState,
        logged_in: false,
      };

    case SET_MODE:
      return {
        ...state,
        mode_preference: action.payload,
      };

    case SET_PROFILE_SUBMITTED:
      return {
        ...state,
        profile_submitted: true,
      };

    default:
      return state;
  }
};

export default userReducer;
