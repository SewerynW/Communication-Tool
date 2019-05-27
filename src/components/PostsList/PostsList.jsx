import React, { Component } from "react";
import style from "./PostsList.module.scss";
import ShortPostElement from "./../ShortPostElement/ShortPostElement";
import PropTypes from "prop-types";

class PostsList extends Component {
  get userPostsSorted() {
    //przekazac zmienna z checkfirendstatus
    //stworzyc lokalna kopie postów odfiltorwana z użyciem
    //i je tu wykorzystać
    if (this.props.userPosts.length > 2) {
      return [...this.props.userPosts].sort(
        (a, b) => Date.parse(b.PublishDate) - Date.parse(a.PublishDate)
      );
    } else {
      return this.props.userPosts.length ? [...this.props.userPosts] : [];
    }
  };
  checkFriendShowStatus=()=> {
 
    let userAfterCheck = this.props.myFriends.filter(
      userPosts =>{
        
       let findResult= this.props.myFriends.find(friendOfMine => friendOfMine.Id === userPosts.Id);
       console.log(findResult, userPosts);
        return     !findResult || findResult.Show;
    
      
      }
    
    );
    console.log("ddd",userAfterCheck);
   };
   
  //  map(friend => (
  //   <Friend
  //     key={friend.Id}
  //     id={friend.Id}
  //     name={friend.Name}
  //     lastName={friend.GivenName}
  //     photo={friend.Photo}
  //     show={friend.Show}
  //     onClickFriend={this.handlerOnClickFriend}
  //   />



  render() {
 console.log("myfir", this.props.userPosts)
 console.log("myyy", this.props.myFriends)


    return (
      <div>
        <button onClick={this.checkFriendShowStatus}></button>
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

export default PostsList;
