import React from "react";
import style from "./EditProfile.module.scss";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Card, Typography, Button, TextField } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { editProfile } from "../../actions/profileActions";
import { withRouter } from "react-router-dom";

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
  }
});

class EditProfile extends React.Component {
  state = {
    user: {
      name: "",
      lastName: "",
      photo: []
    }
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
    // console.log("user1", this.state.user.name);
    console.log("user", this.state.user);
    this.props.editProfile(this.state.user);
    this.props.history.push("/profilePage");
  };

  handleClickInputPhoto = event => {
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
        lastName: GivenName,
        photo: Photo
      }
    }));
  };

  userProfile;

  render() {
    const { classes } = this.props;
    // console.log("edit profile", this.props);
    return (
      <Card className={style.container}>
        <Typography align="center" variant="h4" component="h4" gutterBottom>
          Edit Profile
        </Typography>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            // value={this.state.user.name}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
            required
            value={this.state.user.name}
          />

          <TextField
            id="lastName"
            label="Last Name"
            className={classes.textField}
            // value={this.state.user.lastName}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
            required
            value={this.state.user.lastName}
          />
          <div>
            <Button
              variant="outlined"
              className={classes.button}
              // onClick={this.handleClick}
              id="fileInputButton"
            >
              Add Photo
              <FontAwesomeIcon
                icon="envelope"
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
        </form>
        <div>
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
