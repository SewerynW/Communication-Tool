import React, { PureComponent } from "react";
import style from "./PostsList.module.scss";
import ShortPostElement from "./../ShortPostElement/ShortPostElement";
import PropTypes from "prop-types";
//import Axios from "../../http/dataBase/friends";
import { fetchFriendsPosts} from '../../actions/postActions';
import { connect } from 'react-redux';

class PostsList extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      summaryPosts:[...this.props.userPosts, ...this.props.friendsPost]
    }
  }
  handleGetFriends = ()=>{
    this.props.getMyFriendsPosts();
  };
  get userPostsSorted() {
    //    if (this.state.summarypost.length > 2) {
console.log(this.state.summaryPosts)
    if (this.props.userPosts.length > 2) {
      return [...this.props.userPosts].sort(
        (a, b) => Date.parse(b.PublishDate) - Date.parse(a.PublishDate)
      );
    } else {
      return this.props.userPosts.length ? [...this.props.userPosts] : [];
    }
  }

  render() {
    return (
      <ul className={style.postsList}>
      <button onClick={this.handleGetFriends}>get friends posts</button>
        {this.userPostsSorted.length
          ? this.userPostsSorted.map(post => (
              <li key={post.Id}>
                <ShortPostElement
                  Id={post.Id}
                  Title={post.Title}
                  Text={post.Text}
                  ThumbnailPhoto={post.ThumbnailPhoto}
                  PublishDate={post.PublishDate}
                />
              </li>
            ))
          : "You have not any post on your profile. We wait for your activity!"}
      </ul>
    );
  }
}

PostsList.propTypes = {
  userPosts: PropTypes.array
};
console.log(typeof fetchFriendsPosts);
const mapDispatchToProps = dispatch => ({
  getMyFriendsPosts: () => {
    dispatch(fetchFriendsPosts());
  }
})

const mapStateToProps = state => ({
  friendsPost: state.postReducer.friendsPosts
  
})

// const mapDispatchToProps = dispatch => ({
//   deleteProfile: () => {
//     dispatch(removeProfile()); // z reduxa
//   },
//   deleteAllPosts: () =>{
//     dispatch(removeAllPosts());
//   }
// })

export default connect (mapStateToProps, mapDispatchToProps)(PostsList);
//export default connect(null, mapDispatchToProps)(withStyles(stylesMaterialUi)(DeleteProfilePopUp));
