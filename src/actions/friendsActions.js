import Axios from "./../http/dataBase/friends";

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
};
