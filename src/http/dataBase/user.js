import api from './api'

export default {
  getInfoAboutUser() {
    return new Promise((resolve, reject) => {
      api.get('/user')
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    })
  },

  updateUserProfile(data) {
    return new Promise((resolve, reject) => {
      api.put('/user', data)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    })
  },

  deleteUserProfile() {
    return new Promise((resolve, reject) => {
      api.delete('/user')
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
  }

}