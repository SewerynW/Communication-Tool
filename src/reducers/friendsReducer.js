import {
  UPDATE_FRIEND_STATUS
} from "../actions/friendsActions";

const initState = {
  friendProfile: {}
};

export const friendsReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_FRIEND_STATUS:
      return{
        ...state.friendProfile,
        Show: action.payload.Show
      }
    default:
      return state;
  }
};
