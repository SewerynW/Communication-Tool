import { FIND_FRIENDS, ADD_FRIEND } from "../actions/friendsActions";

const initState = {
  myFriends: ["Olaf"],
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
    default:
      return state;
  }
};
