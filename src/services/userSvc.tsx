import { User } from "../store/Types/UserType"
import axiosClient from "./axiosClient"

const userApi = {
    getAll: () => {
        const url = "/users"
        return axiosClient
            .get(url)
            .then(response => ({ response }))
            .catch(error => ({ error }))
    },

    addUser: (data: User) => {
        const url = "/users"
        return axiosClient
            .post(url, data)
            .then(response => ({ response }))
            .catch(error => ({ error }))
    },
    checkLogin: (user: User) => {
        const url = `/users/${user.id}`
        return axiosClient
            .patch(url)
            .then(response => ({ response }))
            .catch(error => ({ error }))
    },
    checkLogout: (user: User) => {
        const url = `/users/${user.id}`
        return axiosClient
            .patch(url)
            .then(response => ({ response }))
            .catch(error => ({ error }))
    },
}

export default userApi
