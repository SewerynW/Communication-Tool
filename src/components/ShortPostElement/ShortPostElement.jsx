import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import style from "./ShortPostElement.module.scss";
import buttonStyle from "./../FontAwesomeButton/FontAwesomeButton.module.scss";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  withMobileDialog,
  Avatar
} from "@material-ui/core/";
import PostModal from "./../PostModal/PostModal";
import FontAwesomeButton from "./../FontAwesomeButton/FontAwesomeButton";
import { connect } from "react-redux";
import { removePost } from "../../actions/postActions";
import { withRouter } from "react-router-dom";
import AvatarPhoto from "../../assets/profile.png";


const stylesMaterialUi = {
  media: {
    width: "100%",
    height: "100%"
  }
};

class ShortPostElement extends PureComponent {
  state = {
    activePopup: false,
    activeConfirmDialog: false
  };

  handleOnClickEdit = () => {
    const location = {
      pathname: "/editPost",
      state: { postId: this.props.Id }
    };
    this.props.history.push(location);
  };

  handleOnClickDelete = () =>
    this.setState(prevState => ({
      activeConfirmDialog: !prevState.activeConfirmDialog
    }));

  handleOnClickConfirmDelete = () => this.props.deletePost(this.props.Id);

  handleTogglePopup = () => {
    !this.state.activePopup
      ? (document.getElementById("root").style.filter = "blur(2px)")
      : (document.getElementById("root").style.filter = "blur(0)");
    this.setState(prevState => ({
      activePopup: !prevState.activePopup
    }));
  };

  viewFirst200CharactersFullWords = fullPost => {
    if (fullPost === undefined) return null;
    return fullPost.length > 200
      ? `${fullPost.slice(0, fullPost.lastIndexOf(" ", 200))}...`
      : fullPost;
  };

  get localDateString() {
    return `Post published on ${new Date(
      this.props.PublishDate
    ).toLocaleDateString("en-GB")}`;
  }

  render() {
   // const { Photo, GivenName, Name } = this.props.myFriends;
    const {
      classes,
      Title,
      Text,
      ThumbnailPhoto,
      PublishDate,
      fullScreen
    } = this.props;
    const { activePopup, activeConfirmDialog } = this.state;
   // console.log(myFriends.Name)
    return (
      <>
        <Card className={style.shortPostElement}>
          <Grid
            container
            direction="row"
            alignItems="stretch"
            justify="flex-start"
            className={style.postGrid}
          >
            <Grid
              container
              direction="row"
              alignItems="stretch"
              justify="flex-start"
              className={style.postImage}
            >
              <CardMedia
                className={classes.media}
                component="img"
                src={ThumbnailPhoto}
                title="Photo"
              />
            </Grid>
            <Grid
              container
              direction="column"
              alignItems="stretch"
              justify="flex-start"
              className={style.postTextContent}
            >
            {/* {userPost?(<React.Fragment>

            </React.Fragment>):null} */}
               <Grid container justify="flex-end">
                <FontAwesomeButton
                  icon="edit"
                  colorButton={buttonStyle.green}
                  handleOnClick={this.handleOnClickEdit}
                />
                <FontAwesomeButton
                  icon="trash"
                  colorButton={buttonStyle.red}
                  handleOnClick={this.handleOnClickDelete}
                />
              </Grid> 
              {/* <Grid container justify="flex-end">
              <div className={style.userInfo}>
                <Typography
                  className={style.userName}
                >
                  Hi user
                </Typography>
                <Avatar
                  alt="Remy Sharp"
                  src={AvatarPhoto}
                  className={classes.avatar}
                />
            </div>
              </Grid>  */}
              <CardContent className={style.mainContent}>
                <Typography
                  align="left"
                  gutterBottom
                  component="h2"
                  variant="title"
                  className={style.postTitle}
                  onClick={this.handleTogglePopup}
                >
                  {Title} 
                </Typography>
                <Typography
                  component="p"
                  variant="body1"
                  className={style.postDescription}
                >
                  {this.viewFirst200CharactersFullWords(Text)}
                </Typography>
              </CardContent>
              <Typography
                align="right"
                gutterBottom
                component="p"
                variant="body1"
              >
                {this.localDateString}
              </Typography>
            </Grid>
          </Grid>
        </Card>
        <Dialog
          fullScreen={fullScreen}
          open={activeConfirmDialog}
          onClose={this.handleOnClickDelete}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            Are you sure, you want to delete this post?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleOnClickConfirmDelete} color="primary">
              Yes, of course!
            </Button>
            <Button
              onClick={this.handleOnClickDelete}
              color="primary"
              autoFocus
            >
              No, I don't
            </Button>
          </DialogActions>
        </Dialog>
        {activePopup ? (
          <PostModal
            onClose={this.handleTogglePopup}
            open={activePopup}
            postTitle={Title}
            postContent={Text}
            postImage={ThumbnailPhoto}
            postPublishDate={this.localDateString}
          />
        ) : null}
      </>
    );
  }
}

ShortPostElement.propTypes = {
  classes: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => ({
  deletePost: id => {
    dispatch(removePost(id));
  }
});

const mapStateToProps = state => ({
  myFriends: state.friendsReducer.myFriends
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withMobileDialog()(withStyles(stylesMaterialUi)(ShortPostElement)))
);
