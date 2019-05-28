import React from 'react';
import styles from './ProfileInfo.module.scss';


const Profileinfo = (props) => {
  return (
    <h3 className={styles.ProfileInfo}> {props.profileInfoName} {props.profileInfoSurname}</h3>
  );
};

export default Profileinfo;

