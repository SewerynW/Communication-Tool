import React, { Component } from "react";
import style from "./PostsList.module.scss";
import ShortPostElement from "./../ShortPostElement/ShortPostElement";
import PropTypes from "prop-types";
import { connect } from "react-redux";


class PostsList extends Component {
  get userPostsSorted() {
    let userShowTrue =  this.checkFriendShowStatus();
    let filteredPosts =[]       //filtracja postów
    this.props.userPosts.forEach(post => {
        userShowTrue.forEach(user =>{
              if(post.UserId===user.Id)
                filteredPosts.push(post)
          })
          if(post.UserId===this.props.userProfile.Id)
            filteredPosts.push(post)
        });                   // koniec filtracji postów  

    if (filteredPosts.length > 2) {
      return [...filteredPosts].sort(
        (a, b) => Date.parse(b.PublishDate) - Date.parse(a.PublishDate)
      );
    } else {
      return filteredPosts.length ? [...filteredPosts] : [];
    }
  };
    //przekazac zmienna z checkfirendstatus
    //stworzyc lokalna kopie postów odfiltorwana z użyciem
    //i je tu wykorzystać
 
  checkFriendShowStatus=()=> {
 
    let userAfterCheck = this.props.myFriends.filter(
      userPosts =>{
        
       let findResult= this.props.myFriends.find(friendOfMine => friendOfMine.Id === userPosts.Id);
        return     !findResult || findResult.Show;
      }
    );
    return userAfterCheck;
   };



  render() {

    console.log(this.props.userProfile.Id)


    return (
      <div>
      <ul className={style.postsList}>
        {this.userPostsSorted.length
          ? this.userPostsSorted.map(post => (
              <li key={post.Id}>
                <ShortPostElement
                  Id={post.Id}
                  Title={post.Title}
                  Text={post.Text}
                  ThumbnailPhoto={post.ThumbnailPhoto}
                  PublishDate={post.PublishDate}
                />
              </li>
            ))
          : "You have no post on your profile. We wait for your activity!"}
      </ul>
      </div>
    );
  }
}

PostsList.propTypes = {
  userPosts: PropTypes.array
};

const mapStateToProps = state => ({
  userProfile: state.profileReducer
});

export default connect(
  mapStateToProps,null
)(PostsList);




//export default PostsList;
