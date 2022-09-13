import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'b68e1396-946f-405d-92ed-906f9f26a9d8'
    }
})


export const api = {
    async getUser(currentPage: number) {
        const response = await instance.get<FetchUserType>(`users?page=${currentPage}`)
        return response.data
    },
    async getUserProfile(paramsURL: number) {
        const response = await instance.get<UserProfileType>(`profile/${paramsURL}`)
        return response.data
    },
    async authorizedMe() {
        const response = await instance.get<ResponseType<AuthorizedUserType>>(`auth/me`)
        return response.data
    },
    async unFollowUser(usersId: number) {
        const response = await instance.delete<ResponseType>(`follow/${usersId}`)
        return response.data
    },
    async followUser(usersId: number) {
        const response = await instance.post<ResponseType>(`follow/${usersId}`)
        return response.data
    },
    async statusUpdates(newStatus: string) {
        const response = await instance.put<ResponseType>(`profile/status`, {status: newStatus})
        return response.data
    },
    async getStatusUser(userId: number) {
        const response = await instance.get<string | null>(`profile/status/${userId}`)
        return response.data
    },
    async authorize(email: string, password: string) {
        const response = await instance.post<ResponseType<{ id: number }>>(`auth/login`, {email, password})
        return response.data
    },
    async logout() {
        const response = await instance.delete<ResponseType>(`auth/login`)
        return response.data
    },
    async savePhoto(image: string) {
        const bodyFormData = new FormData();
        bodyFormData.append('image', image)

        const response = await instance.put<ResponseType<PhotosTypeResponse>>(`profile/photo`, bodyFormData, {
                headers: {'Content-Type': 'multipart/form-data'}
            }
            ,)
        return response.data
    },

}

//type
export type PhotosTypeResponse = {
    photos: PhotosType

}
export type PhotosType = {
    small: string
    large: string
}
export type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}
export type AuthorizedUserType = {
    id: null | number
    email: null | string
    login: null | string

}
export type UserProfileType = {
    aboutMe: string | null
    contacts: {
        facebook: string | null
        website: string | null
        vk: string | null
        twitter: string | null
        instagram: string | null
        youtube: string | null,
        github: string | null
        mainLink: string | null
    },
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string | null
    userId: number
    photos: {
        small: string | null
        large: string | null
    }
}
export type UserType = {
    name: string
    id: number
    uniqueUrlName: null
    photos: {
        small: null | string
        large: null | string
    },
    status: null | string
    followed: boolean
}
export type FetchUserType = {
    items: Array<UserType>
    totalCount: number
    error: null
}