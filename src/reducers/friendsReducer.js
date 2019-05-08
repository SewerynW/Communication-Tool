import {
  FIND_FRIENDS,
  ADD_FRIEND,
  FETCH_FRIENDS_LIST,
  DELETE_FRIEND
} from "../actions/friendsActions";

const initState = {
  myFriends: [],
  foundPeople: [],
  type: "people"
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
    case DELETE_FRIEND:
      return {
        ...state,
        myFriends: state.myFriends.filter(
          friend => friend.Id !== action.payload
        )
      };
    default:
      return state;
  }
};
