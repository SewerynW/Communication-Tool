import React, { Component } from "react";
import style from "./PostForm.module.scss";
import { Card, Typography, Button, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addPost, editPost } from "./../../actions/postActions";

const materialStyle = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class PostForm extends Component {
  state = {
    idPostToEdit: this.props.location.state
      ? this.props.location.state.postId
      : null,
    post: {
      text: "",
      title: ""
    },
    selectedFile: ""
  };

  handleOnSubmit = event => {
    event.preventDefault();
  };

  handleCancel = () => {
    this.props.history.push({ pathname: "/" });
  };

  handleSelectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  handleOnChange = event => {
    this.setState({
      post: {
        ...this.state.post,
        [event.target.id]: event.target.value
      }
    });
  };

  validateTitle = messagesArray => {
    const { title } = this.state.post;
    if (10 > title.length || title.length > 150) {
      messagesArray.push("Title can contain between 10 and 150 characters.\n");
    }
  };

  validateText = messagesArray => {
    if (this.state.post.text.length > 1000) {
      messagesArray.push("Post's content can contain max 1000 characters.\n");
    }
  };

  validatePhoto = messagesArray => {
    const { selectedFile, idPostToEdit } = this.state;
    if (!selectedFile && !idPostToEdit) {
      messagesArray.push("Post must have a photo.");
    }
  };

  handleSendToServer = () => {
    const { idPostToEdit, post, selectedFile } = this.state;
    const { text, title } = post;
    const messagesForUser = [];

    this.validateTitle(messagesForUser);
    this.validateText(messagesForUser);
    this.validatePhoto(messagesForUser);
    if (messagesForUser.length) {
      alert(messagesForUser);
      return;
    }
    idPostToEdit
      ? this.props.editPost({
          Id: idPostToEdit,
          Text: text,
          Title: title,
          ThumbnailPhoto: selectedFile
        })
      : this.props.addPost({
          userPost: post,
          image: selectedFile
        });
    this.props.history.push({ pathname: "/" });
  };

  render() {
    const { idPostToEdit } = this.state;
    const { classes } = this.props;
    return (
      <div className={style.postForm}>
        <Card>
          <Typography align="center" gutterBottom component="h2" variant="h6">
            {idPostToEdit ? "edit post" : "create new post"}
          </Typography>
          <form onSubmit={this.handleOnSubmit} className={style.form}>
            <TextField
              id="title"
              label="Post's title"
              className={`${classes.textField} ${style.textForm}`}
              placeholder="Type here post's title..."
              helperText="Title have to contain minimum 10 characters but maximum 150."
              multiline
              fullWidth
              required
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              onChange={this.handleOnChange}
              value={this.state.post.title}
              variant="outlined"
            />
            <TextField
              id="text"
              label="Text content of the post"
              className={`${classes.textField} ${style.textForm}`}
              placeholder="Type here content of your post."
              helperText="Content can contain maximum 1000 characters."
              fullWidth
              required
              multiline
              rows={5}
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              onChange={this.handleOnChange}
              value={this.state.post.text}
            />
            <label htmlFor="fileInput" className={style.textForm}>
              <span className={style.button}>Add photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={this.handleSelectedFile}
                id="fileInput"
                style={{ display: "none" }}
              />
            </label>
          </form>
          <div className={style.buttonPanel}>
            <Button onClick={this.handleSendToServer}>Save</Button>
            <Button onClick={this.handleCancel}>Cancel</Button>
          </div>
        </Card>
      </div>
    );
  }
  componentDidMount() {
    if (this.props.location.state) {
      this.props.posts.map(post => {
        if (post.Id === this.props.location.state.postId) {
          this.setState({
            ...this.state,
            post: {
              text: post.Text,
              title: post.Title
            }
          });
        }
      });
    }
  }
}

const mapStateToProps = state => ({
  posts: state.postReducer.userPosts
});

const mapDispatchToProps = dispatch => ({
  addPost: post => {
    dispatch(addPost(post));
  },
  editPost: post => {
    dispatch(editPost(post));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(materialStyle)(PostForm))
);
