import {
  FIND_FRIENDS,
  ADD_FRIEND,
  FETCH_FRIENDS_LIST
} from "../actions/friendsActions";

const initState = {
  myFriends: [],
  foundPeople: []
};

export const friendsReducer = (state = initState, action) => {
  switch (action.type) {
    case FIND_FRIENDS:
      return {
        ...state,
        foundPeople: [...action.payload]
      };
    case ADD_FRIEND:
      return {
        ...state,
        myFriends: [...state.myFriends, action.payload]
      };
    case FETCH_FRIENDS_LIST:
      return {
        ...state,
        myFriends: [...action.payload]
      };
    default:
      return state;
  }
};
