import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "b68e1396-946f-405d-92ed-906f9f26a9d8"
    }
})


export const api = {
    async getUser(currentPage: number) {
        const response = await instance.get(`users?page=${currentPage}`)
        return response.data
    },
    async getUserProfile(paramsURL: number) {
        const response = await instance.get(`profile/${paramsURL}`)
        return response.data
    },
    async authorizedMe() {
        const response = await instance.get(`auth/me`)
        return response.data
    },
    async unFollowUser(usersId: number) {
        const response = await instance.delete(`follow/${usersId}`)
        return response.data
    },
    async followUser(usersId: number) {
        const response = await instance.post(`follow/${usersId}`)
        return response.data
    },
    async statusUpdates(newStatus: string) {
        const response = await instance.put(`profile/status`, {status: newStatus})
        return response.data
    },
    async getStatusUser(userId: number) {
        const response = await instance.get(`profile/status/${userId}`)
        return response.data
    },
    async authorize(email: string, password: string) {
        const response = await instance.post(`auth/login`, {email, password})
        return response.data
    },
    async logout() {
        const response = await instance.delete(`auth/login`)
        return response.data
    },

}