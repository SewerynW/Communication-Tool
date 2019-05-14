import React from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Typography,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia
} from "@material-ui/core";
import style from "./FriendModal.module.scss";
import withStyles from "@material-ui/core/styles/withStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  }
});
export class FriendModal extends React.Component {
  render() {
    const {
      open,
      onClose,
      classes,
      photo,
      name,
      lastName,
      friendPosts
    } = this.props;
    console.log("z modala", this.props);
    return (
      <Modal
        className={style.container}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={onClose}
      >
        <Card className={`${classes.paper} ${style.modal}`}>
          <CardActions>
            <button className={style.btn} onClick={onClose}>
              <FontAwesomeIcon icon="window-close" />
            </button>
          </CardActions>
        </Card>
      </Modal>
    );
  }
}

FriendModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  classes: PropTypes.object,
  photo: PropTypes.string,
  name: PropTypes.string,
  lastName: PropTypes.string,
  friendPosts: PropTypes.array
};

export default withStyles(styles)(FriendModal);
