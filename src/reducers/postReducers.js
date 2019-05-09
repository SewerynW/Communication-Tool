import {
  ADD_POST,
  EDIT_POST,
  FETCH_POSTS,
  REMOVE_POST,
  FILTER_POSTS,
  REMOVE_ALL_POST,
  FETCH_FRIENDS_POSTS
} from "../actions/postActions";

const initState = {
  userPosts: [],
  filteredUserPosts: [],
  friendsPosts: []
};

const checkText = (text, payload) =>
  text.toLowerCase().indexOf(payload.toLowerCase()) !== -1;

const isInPostTitle = (post, payload) => checkText(post.Title, payload);

const isInPostText = (post, payload) => checkText(post.Text, payload);

const getNewPost = (oldPost, newPost) => {
  oldPost.Title = newPost.Title;
  oldPost.Text = newPost.Text;
  if (newPost.ThumbnailPhoto) oldPost.ThumbnailPhoto = newPost.ThumbnailPhoto;
  return oldPost;
};

export const postReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        userPosts: [...state.userPosts, action.payload]
      };
    case FETCH_POSTS:
      return {
        ...state,
        userPosts: [...action.payload]
      };
    case REMOVE_POST:
      return {
        userPosts: state.userPosts.filter(post => post.Id !== action.payload)
      };
    case EDIT_POST:
      return {
        userPosts: state.userPosts.map(post =>
          post.Id === action.payload.Id
            ? getNewPost(post, action.payload)
            : post
        )
      };
      case FETCH_FRIENDS_POSTS:
      //  console.log(action.payload)
        return{
          ...state,
          friendsPosts: [...action.payload]
        };
    case FILTER_POSTS:
      return {
        ...state,
        filteredUserPosts: state.userPosts.filter(
          post =>
            isInPostTitle(post, action.payload) ||
            isInPostText(post, action.payload)
        )

        // ...state,
        // allPosts:[state.userPosts, state.friendsPosts],
        // filteredUserPosts: this.allPosts.filter(
        //   post =>
        //     isInPostTitle(post, action.payload) ||
        //     isInPostText(post, action.payload)
        // )

      };
    case REMOVE_ALL_POST:
      return{
        userPosts:[]
      }
  
    default:
      return state;
  }
};
