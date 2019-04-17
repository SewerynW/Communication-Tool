import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import style from "./Hint.module.scss";
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
  }
});

class Hint extends React.Component {
  state = {
    activePopup: false
  };

  handleTogglePopupLOC = e => {
    this.setState(prevState => ({
      activePopup: !prevState.activePopup
    }));
  };

  render() {
    const { classes, post } = this.props;

    return (
      <CardActionArea
        className={`${style.hint} ${classes.root}`}
        onClick={this.handleTogglePopupLOC}
      >
        <div className={style.title}>
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
        </div>
        <div className={style.text}>
          <Typography component="p">{post.Text}</Typography>
        </div>
        {this.state.activePopup ? (
          <PostModal
            onClose={this.handleTogglePopupLOC}
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
