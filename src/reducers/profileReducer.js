import {
  EDIT_PROFILE,
  REMOVE_PROFILE,
  FETCH_PROFILE,
  REMOVE_DATA,
  SET_CONVERSATION
} from "../actions/profileActions";

const initState = {
  userProfile: {},
  conversation: []
};

export const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case EDIT_PROFILE:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          Name: action.payload.Name,
          GivenName: action.payload.GivenName,
          Photo: action.payload.Photo
        }
      };
    case REMOVE_PROFILE:
      return {
        userPosts: null
      };
    case FETCH_PROFILE:
      return {
        ...state,
        userProfile: action.payload
      };
    case REMOVE_DATA:
      return {
        state: null
      };
    case SET_CONVERSATION:
      return {
        ...state,
        conversation: [...state.conversation, action.payload]
      };
    default:
      return state;
  }
};
