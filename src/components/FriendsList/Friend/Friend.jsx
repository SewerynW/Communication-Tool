import React from "react";
import style from "./Friend.module.scss";
import { Avatar } from "@material-ui/core";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withStyles } from "@material-ui/core/styles";

// Redux
import { connect } from "react-redux";
import { deleteFriend } from "../../../actions/friendsActions";
import { fetchFriendPosts } from "../../../actions/friendsActions";

// Components
import FriendModal from "../../FriendModal/FriendModal";

const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

class Friend extends React.Component {
  state = {
    activePopup: false
  };
  onClickTrash = e => {
    e.stopPropagation();
    this.props.deleteFriend(this.props.id);
  };

  handlerOnClickEye = e => {
    e.stopPropagation();
  };
  handlerOnClickFriend = () => {
    this.setState(prevState => ({
      activePopup: !prevState.activePopup
    }));
    this.props.fetchFriendPosts(this.props.id);
  };

  handleTogglePopup = () => {
    this.setState(prevState => ({
      activePopup: !prevState.activePopup
    }));
  };

  render() {
    const {
      photo,
      name,
      lastName,
      classes,
      show,
      clickedFriendPosts
    } = this.props;
    const { activePopup } = this.state;

    return (
      <React.Fragment>
        <div className={style.container} onClick={this.handlerOnClickFriend}>
          <Avatar alt="Avatar" src={photo} />
          <p> {`${name} ${lastName}`}</p>
          <div className={style.icons}>
            <FontAwesomeIcon
              icon={show ? "eye" : "eye-slash"}
              size="sm"
              className={`${style.icon} ${classes.rightIcon}`}
              onClick={this.onClickEye}
            />
            <FontAwesomeIcon
              icon="trash"
              size="sm"
              className={`${style.icon} ${classes.rightIcon}`}
              onClick={this.onClickTrash}
            />
          </div>
        </div>
        {activePopup ? (
          <FriendModal
            onClose={this.handleTogglePopup}
            open={activePopup}
            photo={photo}
            name={name}
            lastName={lastName}
            friendPosts={clickedFriendPosts}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

Friend.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string,
  lastName: PropTypes.string,
  photo: PropTypes.string,
  onClick: PropTypes.func,
  show: PropTypes.bool,
  onClickFriend: PropTypes.func,
  onClickEye: PropTypes.func,
  onClickTrash: PropTypes.func
};

const mapStateToProps = state => ({
  clickedFriendPosts: state.friendsReducer.clickedFriendPosts
});

const mapDispatchToProps = dispatch => ({
  deleteFriend: friendId => {
    dispatch(deleteFriend(friendId));
  },
  fetchFriendPosts: friendId => {
    dispatch(fetchFriendPosts(friendId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Friend));
