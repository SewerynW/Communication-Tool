import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import style from "./PostHint.module.scss";
import { CardMedia } from "@material-ui/core/";
import CardActionArea from "@material-ui/core/CardActionArea";
import PostModal from "../../../PostModal/PostModal";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
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
    width: 100,
    height: 80,
    [theme.breakpoints.up("sm")]: {
      width: 150,
      height: 100
    }
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
    if (fullPost === undefined || null) return null;
    return fullPost.length > 100
      ? `${fullPost.slice(0, fullPost.lastIndexOf(" ", 100))}...`
      : fullPost;
  };

  render() {
    const { classes, post } = this.props;
    return (
      <CardActionArea
        className={`${style.hint} ${classes.root}`}
        onClick={this.handleToggleModal}
      >
        <CardMedia
          className={classes.media}
          component="img"
          src={post.ThumbnailPhoto}
          title="Photo"
        />

        <div className={style.description}>
          <Typography variant="caption" className={classes.rootTypography}>
            {post.Title}
          </Typography>
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
