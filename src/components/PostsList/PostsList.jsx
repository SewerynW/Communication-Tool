import React, { PureComponent } from "react";
import style from "./PostsList.module.scss";
import ShortPostElement from "./../ShortPostElement/ShortPostElement";
import { connect } from "react-redux";

class PostsList extends PureComponent {
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
    return (
      <ul className={style.postsList}>
        {this.userPostsSorted.length
          ? this.userPostsSorted.map(post => (
              <li key={post.Id}>
                <ShortPostElement
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

const mapStateToProps = state => ({
  userPosts: state.userPosts
});

export default connect(
  mapStateToProps,
  null
)(PostsList);
