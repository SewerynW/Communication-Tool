import React from "react";
import style from "./FriendHint.module.scss";
import { Avatar } from "@material-ui/core";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

const FriendHint = props => {
  const { photo, name, lastName, classes } = props;

  const handlerOnClick = () => {
    console.log("dodaje gościa");
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
  photo: PropTypes.string
};

export default withStyles(styles)(FriendHint);
