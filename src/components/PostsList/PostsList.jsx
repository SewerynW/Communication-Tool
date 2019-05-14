import React, { Component } from "react";
import style from "./PostsList.module.scss";
import ShortPostElement from "./../ShortPostElement/ShortPostElement";
import PropTypes from "prop-types";

class PostsList extends Component {
  shouldComponentUpdate(nextProps, nextState){
   // console.log('bb', this.props);
  //  console.log('nn', nextProps);
    return this.props.myFriends & this.props.nextProps & this.props.myFriends !== 0 & this.props.length !==  nextProps.length 
  }
  get userPostsSorted() {
    if (this.props.userPosts.length > 2) {
      return [...this.props.userPosts].sort(
        (a, b) => Date.parse(b.PublishDate) - Date.parse(a.PublishDate)
      );
    } else {
      return this.props.userPosts.length ? [...this.props.userPosts] : [];
    }
  }
  render() {
   const { myFriends } = this.props;
    return (
      <ul className={style.postsList}>
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
          : "You have no post on your profile. We wait for your activity!"}
      </ul>
    );
  }
}

PostsList.propTypes = {
  userPosts: PropTypes.array
};

export default PostsList;
