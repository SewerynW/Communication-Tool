import Axios from "./../http/dataBase/friends";
export const FIND_FRIENDS = "Find_Friends";
export const ADD_FRIEND = "Add_Friend";
export const FETCH_FRIENDS_LIST = "Fetch_Friends_List";
export const DELETE_FRIEND = "Delete_Friend";
export const FILTER_FRIENDS = "Filter_Friends";


export const UPDATE_FRIEND_STATUS = "Update_Friend_Status";

const updateFriendsStatusSuccess = ({Id, Show}) =>({
    type: UPDATE_FRIEND_STATUS,
    payload: {
        Id, 
        Show
    }
});

export const updateFriendsStatus = profile => dispatch=>{
    const friendProfile={
        Show: profile.updateShowPosts
    };
    return Axios.updateFriendStatus().then(reponse=>{
        dispatch(updateFriendsStatusSuccess());
    })


  }
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

export const addFriend = friend => dispatch => {
  Axios.addFriend(friend)
    .then(response => {
      dispatch(addFriendSuccess(response.data));
    })
    .catch(error => {
      throw error;
    });

  const addFriendSuccess = ({ Name, GivenName, Id, Photo, Show }) => ({
    type: ADD_FRIEND,
    payload: {
      Name,
      GivenName,
      Id,
      Photo,
      Show
    }
  });
};

export const deleteFriend = friendId => dispatch => {
  Axios.deleteFriend(friendId)
    .then(response => {
      dispatch(deleteFriendSuccess(friendId));
    })
    .catch(error => {
      throw error;
    });

  const deleteFriendSuccess = friendId => ({
    type: DELETE_FRIEND,
    payload: friendId
  });
};

export const filterFriends = query => ({
  type: FILTER_FRIENDS,
  payload: query
});
