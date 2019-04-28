import {
  EDIT_PROFILE,
  REMOVE_PROFILE,
  FETCH_PROFILE,
  REMOVE_DATA
} from "../actions/profileActions";

const initState = {
  userProfile: {}
};

export const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case EDIT_PROFILE:
      return {
        // ...action.payload
        ...state.userProfile,
        Name: action.payload.Name,
        GivenName: action.payload.GivenName,
        Photo: action.payload.Photo
      };
    case REMOVE_PROFILE:
      return {
        userPosts: null
      };
    case FETCH_PROFILE:
      return {
        ...action.payload

        // Name: action.payload.Name,
        // GivenName: action.payload.GivenName,
        // Photo: action.payload.Photo
      };
    case REMOVE_DATA:
      return {
        state: null
      };
    default:
      return state;
  }
};
