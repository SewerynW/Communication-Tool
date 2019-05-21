import api from "./api";

export default {
  getFriendsList() {
    return new Promise((resolve, reject) => {
      api
        .get("/friend")
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  },

  findFriend(query) {
    return new Promise((resolve, reject) => {
      api
        .get(`/user/${query}`)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  },

  getInfoAboutFriend(friendId) {
    return new Promise((resolve, reject) => {
      api
        .get(`/friend/${friendId}`)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  },

  getFriendPosts(friendId) {
    return new Promise((resolve, reject) => {
      api
        .get(`/post/friend/${friendId}`)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  },
  getAllFriendsPosts() {
    return new Promise((resolve, reject) => {
      api
        .get("/post/friend")
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  },

  addFriend(friend) {
    return new Promise((resolve, reject) => {
      api
        .post("/friend", friend)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },

  updateFriendStatus(friendId, data) {
    return new Promise((resolve, reject) => {
      api
        .put(`/friend/${friendId}`, data)
       // .then(res => resolve(res))
       .then(res => {
         console.log(friendId, data)
         resolve(res)})

        .catch(err => reject(err));
    });
  },

  deleteFriend(friendId) {
    return new Promise((resolve, reject) => {
      api
        .delete(`/friend/${friendId}`)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }
};
api.interceptors.request.use(config => {
  if (sessionStorage.userId) {
    config.headers = {
      "X-ZUMO-AUTH": sessionStorage.userId
    };
    return config;
  }
});