import React from "react";
import style from "./EditProfile.module.scss";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  Button,
  TextField,
  CardMedia
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { editProfile } from "../../actions/profileActions";
import { withRouter } from "react-router-dom";
import AvatarPhoto from "../../assets/profile.png";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  media: {
    height: 140,
    backgroundSize: "contain"
  }
});

class EditProfile extends React.Component {
  state = {
    user: {
      name: "",
      lastName: "",
      photo: null
    },
    tmPhoto: null,
    currentPhoto: null
  };

  componentDidMount = () => {
    this.fillUpFields();
    this.mountListener();
  };

  handleChange = event => {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.id]: event.target.value
      }
    });
  };
  handleClickUpdateProfile = () => {
    this.props.editProfile(this.state.user);
    this.props.history.push("/profilePage");
  };

  handleClickInputPhoto = event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.setState({
        tmPhoto: reader.result
      });
    };

    this.setState({
      user: {
        ...this.state.user,
        photo: event.target.files[0]
      }
    });
  };

  mountListener = () => {
    const fileInput = document.getElementById("fileInput");
    const inputButton = document.getElementById("fileInputButton");
    inputButton.addEventListener("click", () => {
      fileInput.click();
    });
  };

  fillUpFields = () => {
    const { Name, GivenName, Photo } = this.props.userProfile;
    this.setState(() => ({
      user: {
        name: Name,
        lastName: GivenName
      },
      currentPhoto: Photo
    }));
  };

  render() {
    const { classes } = this.props;
    const { user, currentPhoto, tmPhoto } = this.state;
    // console.log(currentPhoto, tmPhoto);
    // console.log(typeof currentPhoto, typeof tmPhoto);
    return (
      <Card className={style.container}>
        <Typography align="center" variant="h4" component="h4" gutterBottom>
          Edit Profile
        </Typography>
        <div className={style.inputs}>
          <form className={style.textsInputs} noValidate autoComplete="off">
            <TextField
              id="name"
              label="Name"
              className={classes.textField}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              required
              value={user.name}
            />

            <TextField
              id="lastName"
              label="Last Name"
              className={classes.textField}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              required
              value={user.lastName}
            />
          </form>
          <div className={style.photo}>
            <div>
              <CardMedia
                className={classes.media}
                image={
                  tmPhoto ? tmPhoto : currentPhoto ? currentPhoto : AvatarPhoto
                }
                title="Avatar"
                id="photo"
              />
            </div>
            <div className={style.inputButton}>
              <Button
                variant="outlined"
                className={classes.button}
                id="fileInputButton"
              >
                {currentPhoto || user.photo ? "Change Photo" : "Add Photo"}
                <FontAwesomeIcon
                  icon="file-image"
                  size="lg"
                  className={classes.rightIcon}
                />
              </Button>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={this.handleClickInputPhoto}
                id="fileInput"
              />
            </div>
          </div>
        </div>
        <div className={style.uploadButton}>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={this.handleClickUpdateProfile}
          >
            Save
            <FontAwesomeIcon
              icon="envelope"
              size="lg"
              className={classes.rightIcon}
            />
          </Button>
        </div>
      </Card>
    );
  }
}
const mapStateToProps = state => ({
  userProfile: state.profileReducer
});

const mapDispatchToProps = dispatch => {
  return {
    editProfile: profile => {
      dispatch(editProfile(profile));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(EditProfile))
);
