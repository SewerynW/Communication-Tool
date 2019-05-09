import {
  FIND_FRIENDS,
  ADD_FRIEND,
  FETCH_FRIENDS_LIST,
  DELETE_FRIEND,
  FILTER_FRIENDS
} from "../actions/friendsActions";

const initState = {
  myFriends: [],
  foundPeople: [],
  filteredMyFriends: [],
  type: "people"
};

const checkPerson = (person, payload) =>
  person.toLowerCase().indexOf(payload.toLowerCase()) !== -1;

const isInName = (person, payload) => checkPerson(person.GivenName, payload);

const isInLastName = (person, payload) => checkPerson(person.Name, payload);

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
    case FILTER_FRIENDS:
      return {
        ...state,
        filteredMyFriends: state.myFriends.filter(
          person =>
            isInName(person, action.payload) ||
            isInLastName(person, action.payload)
        )
      };
    default:
      return state;
  }
};
