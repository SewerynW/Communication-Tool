import {
  ADD_POST,
  EDIT_POST,
  FETCH_POSTS,
  REMOVE_POST
} from "../actions/postActions";

const initState = {
  userPosts: []
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
    default:
      return state;
  }
};
