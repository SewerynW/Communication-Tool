import Axios from "./../http/dataBase/posts";
import AxiosFriends from "./../http/dataBase/friends";


export const ADD_POST = "Add_Post";
export const FETCH_POSTS = "Fetch_Posts";
export const EDIT_POST = "Edit_Post";
export const REMOVE_POST = "Remove_Post";
export const FILTER_POSTS = "Filter_Posts";
export const REMOVE_ALL_POST= "Remove_All_Posts";
export const FETCH_FRIENDS_POSTS = "Fetch_Friends_Posts";


export const removeAllPosts = () => ({
  type: REMOVE_ALL_POST
});

export const addPost = ({ userPost, image }) => dispatch => {
  const formData = new FormData();
  formData.append("photo", image);
  formData.append("post", JSON.stringify(userPost));
  return Axios.createPost(formData)
    .then(response => {
      dispatch(addPostSuccess(response));
    })
    .catch(error => {
      throw error;
    });
};

const addPostSuccess = ({ Id, Title, Text, ThumbnailPhoto, PublishDate }) => ({
  type: ADD_POST,
  payload: {
    Id,
    Title,
    Text,
    ThumbnailPhoto,
    PublishDate
  }
});
// export const fetchPosts = () => dispatch =>{
//   const tempObject = {};
//   Axios.getPosts()
//     .then(response => {
//       dispatch(fetchPostsSuccess(response));
//     })
//     .catch(error => {
//       throw error;
//     });}

export const fetchPosts = () => async dispatch =>{
  try{
    const userPosts = await Axios.getPosts();
    const friendsData = await AxiosFriends.getAllFriendsPosts();
    const friendsPosts = [];
    friendsData.map(data => data.Posts.map(post => friendsPosts.push(post)));
    dispatch(fetchPostsSuccess( [...userPosts, ...friendsPosts] ));
  }catch(error){
    throw error;
  }}


const fetchPostsSuccess = postsArray => ({
  type: FETCH_POSTS,
  payload: postsArray
});

export const editPost = post => dispatch => {
  const formData = new FormData();
  const userPost = {
    title: post.Title,
    text: post.Text
  };
  if (post.ThumbnailPhoto) {
    formData.append("photo", post.ThumbnailPhoto);
  }
  formData.append("post", JSON.stringify(userPost));
  return Axios.updatePost(post.Id, formData).then(response => {
    dispatch(editPostSuccess(response));
  });
};

const editPostSuccess = ({ Id, Title, Text, ThumbnailPhoto }) => ({
  type: EDIT_POST,
  payload: {
    Id,
    Title,
    Text,
    ThumbnailPhoto
  }
});

export const removePost = id => dispatch =>
  Axios.deletePost(id)
    .then(response => {
      dispatch(removePostSuccess(id));
    })
    .catch(error => {
      throw error;
    });

const removePostSuccess = id => ({
  type: REMOVE_POST,
  payload: id
});

export const filterPosts = query => ({
  type: FILTER_POSTS,
  payload: query
});


