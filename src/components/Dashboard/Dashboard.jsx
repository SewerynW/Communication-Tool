import React from "react";
import PostsList from "../PostsList/PostsList";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { FormControl, Input, InputLabel } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import style from "./Dashboard.module.scss";
import { filtrPosts } from "../../actions/postActions";

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
    this.setState(() => ({
      query: queryFromInput
    }));
    this.props.filtrPosts(queryFromInput);
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={style.search}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="component-simple">Search Post</InputLabel>
            <Input id="component-simple" onChange={this.handleInputChanges} />
          </FormControl>
        </div>

        <PostsList
          userPosts={
            this.state.query.length
              ? this.props.filteredUserPosts
              : this.props.userPosts
          }
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  userPosts: state.postReducer.userPosts,
  filteredUserPosts: state.postReducer.filteredUserPosts
});

const mapDispatchToProps = dispatch => {
  return {
    filtrPosts: query => {
      dispatch(filtrPosts(query));
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
