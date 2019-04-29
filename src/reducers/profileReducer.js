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
          userProfile: { ...state.userProfile, 
            Name:action.Name,
            GivenName:action.GivenName,
          }
        };
      case REMOVE_PROFILE:
        return {
          userProfile:{},
          state: undefined

        };
     case FETCH_PROFILE:
     return{
            Name:action.payload.Name,
            GivenName:action.payload.GivenName,
            Photo:action.payload.Photo
     };
     case REMOVE_DATA:
    return{
      state:null
    }
      default:
        return state;
    }
  };
  