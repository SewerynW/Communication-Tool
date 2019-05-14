import {
  UPDATE_FRIEND_STATUS,
  FIND_FRIENDS,
  ADD_FRIEND,
  FETCH_FRIENDS_LIST,
  DELETE_FRIEND,
  FILTER_FRIENDS,
  FETCH_FRIEND_POSTS,
  DELETE_ALL_FRIENDS
} from "../actions/friendsActions";

const initState = {
  clickedFriendPosts: [],
  friendProfile: {},
  myFriends: [],
  foundPeople: [],
  filteredMyFriends: [],
  type: "people"
};

const checkPerson = (person, payload) =>
  person.toLowerCase().indexOf(payload.toLowerCase()) !== -1;

const isInName = (person, payload) => checkPerson(person.GivenName, payload);

const isInLastName = (person, payload) => checkPerson(person.Name, payload);

const ifExists = (id, myFriends) => {
  return !myFriends.some(el => el.Id === id);
};

export const friendsReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_FRIEND_STATUS:
      return {
        ...state.friendProfile,
        Show: action.payload.Show
      };
    case FIND_FRIENDS:
      return {
        ...state,
        foundPeople: action.payload.filter(person =>
          ifExists(person.Id, state.myFriends)
        )
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
    case FETCH_FRIEND_POSTS:
      return {
        ...state,
        clickedFriendPosts: action.payload
      };
    case DELETE_ALL_FRIENDS:
      return {
        myFriends: []
      };
    default:
      return state;
  }
};
