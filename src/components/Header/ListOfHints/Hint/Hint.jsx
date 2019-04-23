import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import style from "./Hint.module.scss";
import { CardMedia } from "@material-ui/core/";
import CardActionArea from "@material-ui/core/CardActionArea";
import PostModal from "../../../PostModal/PostModal";

const styles = theme => ({
  root: {
    display: "flex",
    paddingTop: 5,
    paddingBottom: 5,
    "&:hover": {
      backgroundColor: "lightGray"
    }
  },
  rootTypography: {
    fontWeight: "bold",
    fontSize: 14,
    [theme.breakpoints.up("sm")]: {
      fontSize: 22
    }
  },
  media: {
    width: "100%",
    height: "100%"
  }
});

class Hint extends React.Component {
  state = {
    activePopup: false
  };

  handleToggleModal = e => {
    this.setState(prevState => ({
      activePopup: !prevState.activePopup
    }));
  };

  shortedOutPostText = fullPost => {
    if (fullPost === undefined) return null;
    return fullPost.length > 80
      ? `${fullPost.slice(0, fullPost.lastIndexOf(" ", 80))}...`
      : fullPost;
  };

  render() {
    const { classes, post, ThumbnailPhoto } = this.props;
    console.log(post);

    return (
      <CardActionArea
        className={`${style.hint} ${classes.root}`}
        onClick={this.handleToggleModal}
      >
        {/* <div className={style.title}>
          <div className={style.titleLabel}>
            <Typography variant="caption">Title</Typography>
          </div>
          <Typography
            variant="h6"
            gutterBottom
            className={classes.rootTypography}
          >
            {post.Title}
          </Typography>
        </div> */}
        <CardMedia
          className={classes.media}
          component="img"
          src={ThumbnailPhoto}
          title="Photo"
        />

        <div>
          <div className={style.title}>
            <Typography
              variant="h6"
              gutterBottom
              className={classes.rootTypography}
            >
              {post.Title}
            </Typography>
          </div>

          <div className={style.text}>
            <Typography component="p">
              {this.shortedOutPostText(post.Text)}
            </Typography>
          </div>
        </div>
        {this.state.activePopup ? (
          <PostModal
            onClose={this.handleToggleModal}
            open={this.state.activePopup}
            postTitle={post.Title}
            postContent={post.Text}
            postImage={post.ThumbnailPhoto}
            postPublishDate={post.PublishDate}
          />
        ) : null}
      </CardActionArea>
    );
  }
}

Hint.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object
};

export default withStyles(styles)(Hint);
