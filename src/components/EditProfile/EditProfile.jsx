import React from "react";
import style from "./EditProfile.module.scss";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Card, Typography, Button, TextField } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    this.listener();
  };

  handleChange = name => event => {
    console.log(event.target, name);
    this.setState({
      user: {
        ...this.state.user,
        [name]: event.target.value
      }
    });
  };
  handleClick = e => {
    console.log("user", this.state.user);
  };

  handleClickInputPhoto = event => {
    this.setState({
      user: {
        photo: event.target.files[0]
      }
    });
  };

  listener = () => {
    const fileInput = document.getElementById("fileInput");
    const inputButton = document.getElementById("fileInputButton");
    inputButton.addEventListener("click", () => {
      fileInput.click();
    });
  };

  render() {
    const { classes } = this.props;
    // console.log(this.props);
    return (
      <Card className={style.container}>
        <Typography align="center" variant="h4" component="h4" gutterBottom>
          Edit Profile
        </Typography>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="outlined-name"
            label="Name"
            className={classes.textField}
            // value={this.state.user.name}
            onChange={this.handleChange("name")}
            margin="normal"
            variant="outlined"
          />

          <TextField
            id="outlined-name"
            label="Last Name"
            className={classes.textField}
            // value={this.state.user.lastName}
            onChange={this.handleChange("lastName")}
            margin="normal"
            variant="outlined"
          />
        </form>
        <form>
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
        </form>
        <div>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={this.handleClick}
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

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditProfile));
