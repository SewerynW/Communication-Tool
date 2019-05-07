import React from "react";
import style from "./Friend.module.scss";
import { Avatar } from "@material-ui/core";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

const Friend = props => {
  const {
    photo,
    name,
    lastName,
    classes,
    onClickFriend,
    onClickEye,
    onClickTrash,
    show
  } = props;

  return (
    <div className={style.container} onClick={onClickFriend}>
      <Avatar alt="Avatar" src={photo} />
      <p> {`${name} ${lastName}`}</p>
      <div className={style.icons}>
        <FontAwesomeIcon
          icon={show ? "eye" : "eye-slash"}
          size="sm"
          className={`${style.icon} ${classes.rightIcon}`}
          onClick={onClickEye}
        />
        <FontAwesomeIcon
          icon="trash"
          size="sm"
          className={`${style.icon} ${classes.rightIcon}`}
          onClick={onClickTrash}
        />
      </div>
    </div>
  );
};

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

export default withStyles(styles)(Friend);
