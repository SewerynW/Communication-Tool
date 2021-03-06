import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ListOfHints from "./ListOfHints/ListOfHints";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { fade } from "@material-ui/core/styles/colorManipulator";
import PropTypes from "prop-types";

const styles = theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "50%",
    [theme.breakpoints.up("sm")]: {
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
});

class Search extends React.Component {
  render() {
    const {
      classes,
      handleCloseHintPopUp,
      handleInputChanges,
      filteredData,
      hintPopUp,
      dataType,
      additionalStyle
    } = this.props;

    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          onChange={handleInputChanges}
        />
        {hintPopUp ? (
          <ListOfHints
            additionalStyle={additionalStyle}
            dataType={dataType}
            filteredData={filteredData}
            handleCloseHintPopUp={handleCloseHintPopUp}
          />
        ) : null}
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
  handleCloseHintPopUp: PropTypes.func,
  handleInputChanges: PropTypes.func,
  filteredData: PropTypes.array,
  hintPopUp: PropTypes.bool,
  dataType: PropTypes.string,
  additionalStyle: PropTypes.object
};

export default withStyles(styles)(Search);
