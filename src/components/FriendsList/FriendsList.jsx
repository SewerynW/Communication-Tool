import React from "react";
import style from "./FriendsList.module.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components
import Friend from "./Friend/Friend";

class FriendsList extends React.Component {
  handlerOnClickFriend = () => {
    console.log("tylko friend");
  };

  handlerOnClickEye = e => {
    e.stopPropagation();
    console.log("tylko oko");
  };

  handlerOnClickTrash = e => {
    e.stopPropagation();
    console.log("tylko smieci");
  };

  info = () => <p>Sorry you don't have any friends...</p>;

  render() {
    const { myFriends } = this.props;

    return (
      <div className={style.container}>
        {myFriends.length !== 0
          ? myFriends.map(friend => (
              <Friend
                key={friend.Id}
                name={friend.Name}
                lastName={friend.GivenName}
                photo={friend.Photo}
                show={friend.Show}
                onClickFriend={this.handlerOnClickFriend}
                onClickEye={this.handlerOnClickEye}
                onClickTrash={this.handlerOnClickTrash}
              />
            ))
          : this.info()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  myFriends: state.friendsReducer.myFriends
});

FriendsList.propTypes = {
  myFriends: PropTypes.array
};

export default connect(
  mapStateToProps,
  null
)(FriendsList);
