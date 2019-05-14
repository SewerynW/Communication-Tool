import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Modal,
  Typography,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia
} from "@material-ui/core";

export class FriendModal extends React.Component {
  render() {
    return <Modal />;
  }
}

FriendModal.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendModal);
