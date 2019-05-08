import React from "react";
import style from "./FriendHint.module.scss";
import { Avatar } from "@material-ui/core";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withStyles } from "@material-ui/core/styles";

// Redux
import { connect } from "react-redux";
import { addFriend } from "../../../../actions/friendsActions";

const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

const FriendHint = props => {
  const {
    photo,
    name,
    lastName,
    classes,
    addFriend,
    id,
    show,
    handleCloseHintPopUp
  } = props;

  const handlerOnClick = () => {
    const friend = {
      FriendId: id,
      Show: show
    };
    addFriend(friend);
    handleCloseHintPopUp();
  };

  return (
    <div className={style.container}>
      <Avatar alt="Avatar" src={photo} />
      <p> {`${name} ${lastName}`}</p>
      <div className={style.icons}>
        <FontAwesomeIcon
          icon="handshake"
          size="lg"
          className={`${style.icon} ${classes.rightIcon}`}
          onClick={handlerOnClick}
        />
      </div>
    </div>
  );
};

FriendHint.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string,
  lastName: PropTypes.string,
  photo: PropTypes.string,
  addFriend: PropTypes.func,
  id: PropTypes.string,
  show: PropTypes.bool,
  handleCloseHintPopUp: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return {
    addFriend: friend => {
      dispatch(addFriend(friend));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(FriendHint));
