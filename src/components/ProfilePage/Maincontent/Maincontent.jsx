import React from "react";
import Grid from "@material-ui/core/Grid";
import { Photo } from "./Photo/Photo";
import Profileinfo from "./Profileinfo/Profileinfo";

export class Maincontent extends React.Component {
  render() {
    return (
      <Grid container>
        <Grid item sm={12}>
          <Photo profilePhoto={this.props.profilePhoto} />
          <Profileinfo
            profileInfoName={this.props.profileInfoName}
            profileInfoSurname={this.props.profileInfoSurname}
          />
        </Grid>
      </Grid>
    );
  }
}
