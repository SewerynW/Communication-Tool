import React from "react";
import style from "./DeleteProfilePopUp.module.scss";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {
  Modal,
  Typography,
  Grid,
  Card,
  CardContent
} from "@material-ui/core";
import { removeProfile } from '../../actions/profileActions';
import { removeAllPosts} from '../../actions/postActions'

import { connect } from 'react-redux';

const stylesMaterialUi = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  }
});

class DeleteProfilePopUp extends React.PureComponent {
  state = {
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

handleDeleteProfile = () =>{
  this.props.deleteProfile();
  this.props.deleteAllPosts();
  //dokoncz przesylanie propsami
 // this.props.history.push("/logout");
  this.props.offBlur();
}
  
  render(){
    const { checkbox1, checkbox2, checkbox3 } = this.state;
    const error = [checkbox1, checkbox2, checkbox3].filter(v => v).length !== 2;

  const {
    classes,
    onClose,
    open
  } = this.props;
  return (
    <Modal
      className={style.modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={onClose}
    >
      <Card className={`${classes.paper} ${style.modal_inner}`}>
        <CardContent>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <Typography gutterBottom variant="h5" component="h2">
              Are you sure?</Typography>
            <Typography component="p">Deleting your account will remove all your posts!</Typography>
            
            <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={checkbox1} onChange={this.handleChange('checkbox1')} value="checkbox1" />
                  }
                  label="I know what I'm doing"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={checkbox2} onChange={this.handleChange('checkbox2')} value="checkbox2" />
                  }
                  label="I'm sure, I want to delete it!"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={checkbox3} onChange={this.handleChange('checkbox3')} value="checkbox3"/>
                  }
                  label="Just do it!"
                />
                <div  display="flex" justifyContent="space-between" alignItems="center">
                  <Button variant="contained" className={classes.button} onClick={onClose} > I'm staying </Button>
                  <Button variant="contained" className={classes.button} onClick={this.handleDeleteProfile} 
                    disabled={!(this.state.checkbox1&&this.state.checkbox2&&this.state.checkbox3)}> Delete </Button>
                </div>
              </FormGroup>
            </FormControl>
            <FormControl required error={error} component="fieldset" className={classes.formControl}>
            </FormControl>
          </div>
          </Grid>
        </CardContent>
      </Card>
    </Modal>
   );
  }
}
const mapDispatchToProps = dispatch => ({
  deleteProfile: () => {
    dispatch(removeProfile());
  },
  deleteAllPosts: () =>{
    dispatch(removeAllPosts());
  }

})



export default connect(null, mapDispatchToProps)(withStyles(stylesMaterialUi)(DeleteProfilePopUp));
