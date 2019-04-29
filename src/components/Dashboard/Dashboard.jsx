import React from "react";
import PostsList from "../PostsList/PostsList";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { FormControl, Input, InputLabel, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import style from "./Dashboard.module.scss";
import { filterPosts } from "../../actions/postActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit
  }
});

class Dashboard extends React.Component {
  state = {
    query: ""
  };

  handleClick = () => {
    this.props.history.push("/newPost");
  };

  handleInputChanges = event => {
    let queryFromInput = event.target.value;
    this.setState(() => ({
      query: queryFromInput
    }));
    this.props.filterPosts(queryFromInput);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={style.container}>
        <div className={style.features}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="component-simple">Search Post</InputLabel>
            <Input id="component-simple" onChange={this.handleInputChanges} />
          </FormControl>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={this.handleClick}
          >
            New Post
            <FontAwesomeIcon
              icon="envelope"
              size="lg"
              className={classes.rightIcon}
            />
          </Button>
        </div>

        <PostsList
          userPosts={
            this.state.query.length
              ? this.props.filteredUserPosts
              : this.props.userPosts
          }
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userPosts: state.postReducer.userPosts,
  filteredUserPosts: state.postReducer.filteredUserPosts
});

const mapDispatchToProps = dispatch => {
  return {
    filterPosts: query => {
      dispatch(filterPosts(query));
    }
  };
};

Dashboard.propTypes = {
  classes: PropTypes.object,
  userPosts: PropTypes.array
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Dashboard))
);
