import React from "react";
import style from "./FriendsList.module.scss";
import PropTypes from "prop-types";

// Components
import Friend from "./Friend/Friend";

class FriendsList extends React.Component {
  handlerOnClickFriend = () => {
    console.log("tylko friend");
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
                id={friend.Id}
                name={friend.Name}
                lastName={friend.GivenName}
                photo={friend.Photo}
                show={friend.Show}
                onClickFriend={this.handlerOnClickFriend}
              />
            ))
          : this.info()}
      </div>
    );
  }
}

FriendsList.propTypes = {
  myFriends: PropTypes.array
};

export default FriendsList;
