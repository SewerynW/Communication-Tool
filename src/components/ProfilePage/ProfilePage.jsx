import React from 'react';
import styles from './ProfilePage.module.scss';

import { Maincontent } from '../Maincontent/Maincontent.jsx';
import { Buttonspanel } from '../Buttonspanel/Buttonspanel.jsx';


export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      person: {
        name: 'Jane',
        surname: 'Doe',
      },
      image: ""
    }
  }

  render() {
    return (
      <React.Fragment>
        <Maincontent profilePhoto={this.state.image} profileInfoName={this.state.person.name} profileInfoSurname={this.state.person.surname} />
        <Buttonspanel />
      </React.Fragment>

    )
  }
}