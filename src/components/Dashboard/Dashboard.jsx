import React from "react";
import PostsList from "../PostsList/PostsList";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { FormControl, Input, InputLabel } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import style from "./Dashboard.module.scss";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit
  }
});

class Dashboard extends React.Component {
  state = {
    query: ""
  };

  handleInputChanges = event => {
    let queryFromInput = event.target.value;
    this.setState(() => ({ query: queryFromInput }));
  };

  render() {
    const { classes } = this.props;

    let filteredPosts = this.props.userPosts.filter(post => {
      return (
        post.Title.toLowerCase().indexOf(this.state.query.toLowerCase()) !==
          -1 ||
        post.Text.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1
      );
    });

    return (
      <React.Fragment>
        <div className={style.search}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="component-simple">Search Post</InputLabel>
            <Input id="component-simple" onChange={this.handleInputChanges} />
          </FormControl>
        </div>

        <PostsList filteredPosts={filteredPosts} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  userPosts: state.postReducer.userPosts
});

Dashboard.propTypes = {
  classes: PropTypes.object,
  userPosts: PropTypes.array
};

export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(Dashboard))
);
