import {
  ADD_POST,
  EDIT_POST,
  FETCH_POSTS,
  REMOVE_POST,
  FILTR_POSTS
} from "../actions/postActions";

const initState = {
  userPosts: [],
  filteredUserPosts: []
};

const isInPostTitle = (post, payload) => {
  return post.Title.toLowerCase().indexOf(payload.toLowerCase()) !== -1;
};

const isInPostText = (post, payload) => {
  return post.Text.toLowerCase().indexOf(payload.toLowerCase()) !== -1;
};

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
    case FILTR_POSTS:
      return {
        ...state,
        filteredUserPosts: state.userPosts.filter(
          post =>
            isInPostTitle(post, action.payload) ||
            isInPostText(post, action.payload)
        )
      };
    default:
      return state;
  }
};
