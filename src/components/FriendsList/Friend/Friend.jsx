import React from "react";
import style from "./Friend.module.scss";
import { Avatar } from "@material-ui/core";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withStyles } from "@material-ui/core/styles";

// Redux
import { connect } from "react-redux";
import { deleteFriend, updateFriendStatus } from "../../../actions/friendsActions";
import { fetchPosts } from "../../../actions/postActions";

const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

class Friend extends React.Component {
  onClickTrash = e => {
    e.stopPropagation();
    this.props.deleteFriend(this.props.id);
    this.props.fetchPosts();
  };
  onClickOnEye = e => {
    e.stopPropagation();
    this.props.updateFriendStatus(this.props.id, !this.props.show);
  }

  

  render() {
    const { photo, name, lastName, classes, onClickFriend, show } = this.props;
    return (
      <div className={style.container} onClick={onClickFriend}>
        <Avatar alt="Avatar" src={photo} />
        <p> {`${name} ${lastName}`}</p>
        <div className={style.icons}>
          <FontAwesomeIcon
            icon={show ? "eye" : "eye-slash"}
            size="sm"
            className={`${style.icon} ${classes.rightIcon}`}
            onClick={this.onClickOnEye}
          />
          <FontAwesomeIcon
            icon="trash"
            size="sm"
            className={`${style.icon} ${classes.rightIcon}`}
            onClick={this.onClickTrash}
          />
        </div>
      </div>
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

const mapDispatchToProps = dispatch => {
  return {
    deleteFriend: friendId => {
      dispatch(deleteFriend(friendId));
    }, 
    fetchPosts: () => {
      dispatch(fetchPosts());
    },
    updateFriendStatus: (id,show) =>{
      dispatch(updateFriendStatus(id, show));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Friend));

