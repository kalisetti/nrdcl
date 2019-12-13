import {
  SET_ERROR,
  SET_LOADING,
  SET_TITLE,
  SET_RANDOM,
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  error: null,
  title: '',
  random: 0, //used for reload
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_ERROR:
      return {...state, error: payload};

    case SET_LOADING:
      return {...state, isLoading: payload};

    case SET_RANDOM:
      return {...state, random: payload};

    case SET_TITLE:
      return {
        ...state,
        title: payload,
      };

    default:
      return state;
  }
};
