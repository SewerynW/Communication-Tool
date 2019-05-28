import api from './api'

export default {
    getAuthenticationToken(token) {
        return new Promise((resolve, reject) => {
            api.post('/google', {
                    id_token: token
                })
                .then((res) => resolve(res.data))
                .catch((err) => reject(err))
        })
    }
}