import Axios from "./../http/dataBase/friends";

export const FIND_FRIENDS = "Find_Friends";
export const ADD_FRIEND = "Add_Friend";
export const FETCH_FRIENDS_LIST = "Fetch_Friends_List";

export const fetchFriendsList = () => dispatch => {
  Axios.getFriendsList()
    .then(response => {
      dispatch(fetchFriendsListSuccess(response));
    })
    .catch(error => {
      throw error;
    });

  const fetchFriendsListSuccess = friendsList => ({
    type: FETCH_FRIENDS_LIST,
    payload: friendsList
  });
};

export const findFriends = query => dispatch => {
  Axios.findFriend(query)
    .then(response => {
      dispatch(findFriendsSucces(response));
    })
    .catch(error => {
      throw error;
    });

  const findFriendsSucces = usersList => ({
    type: FIND_FRIENDS,
    payload: usersList
  });
};

export const addFriend = ({ friendId, show }) => dispatch => {
  const formData = new FormData();
  formData.append("FriendId", friendId);
  formData.append("Show", show);
  Axios.addFriend(formData)
    .then(response => {
      dispatch(addFriendSuccess(response));
    })
    .catch(error => {
      throw error;
    });

  const addFriendSuccess = ({ friendId, show }) => ({
    type: ADD_FRIEND,
    payload: {
      friendId,
      show
    }
  });
};
