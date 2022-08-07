import {api, UserProfileType} from '../api/api';
import {setIsLoading} from './authorizedReducer';
import {AppThunk} from './store';

const initialSateProfile = {
    posts: [
        {id: 1, massage: 'Everything is great', likes: 3},
        {id: 2, massage: 'Looking for my dream job', likes: 4},
        {id: 3, massage: 'I develop my skills', likes: 5},
        {id: 4, massage: 'Got a job of your dreams', likes: 12},
    ] as Array<PostsType>,
    userProfile: {} as UserProfileType,
    userStatus: null as null | string
}

export const profileReducer = (state = initialSateProfile, action: ActionProfileReducerType): InitialSateProfileType => {
    switch (action.type) {
        case 'PROFILE/ADD_POST' :
            let newPost: PostsType = {
                id: 23,
                massage: action.payload,
                likes: 0
            }
            return {
                ...state,
                posts: [newPost, ...state.posts],
            }
        case 'PROFILE/SET_USER_PROFILE':
            return {
                ...state,
                userProfile: action.payload
            }
        case 'PROFILE/SET_STATUS_UPDATES':
            return {
                ...state,
                userStatus: action.payload
            }
        default:
            return state
    }
};

//action
export const addPost = (payload: string) => ({type: 'PROFILE/ADD_POST', payload} as const)
export const setUserProfile = (payload: UserProfileType) => ({type: 'PROFILE/SET_USER_PROFILE', payload} as const)
export const setStatusUpdates = (payload: string | null) => ({type: 'PROFILE/SET_STATUS_UPDATES', payload} as const)

//thunk
export const fetchUserProfileData = (paramsURL: number): AppThunk => async dispatch => {
    try {
        dispatch(setIsLoading(true))
        if (paramsURL) {
            let response = await api.getUserProfile(paramsURL)
            dispatch(setUserProfile(response))
            let responseStatus = await api.getStatusUser(response.userId)
            dispatch(setStatusUpdates(responseStatus))
        }
    } catch (error) {
        console.log(error)
    } finally {
        dispatch(setIsLoading(false))
    }
}
export const fetchStatusUpdates = (newStatus: string, usersId: number): AppThunk => async dispatch => {
    try {
        dispatch(setIsLoading(true))
        let response = await api.statusUpdates(newStatus)
        if (response.resultCode === 0) {
            let responseNewStatus = await api.getStatusUser(usersId)
            dispatch(setStatusUpdates(responseNewStatus))
        }
    } catch (error) {
        console.log(error)
    } finally {
        dispatch(setIsLoading(false))
    }
}

//type
export type InitialSateProfileType = typeof initialSateProfile
export type PostsType = {
    id: number
    massage: string
    likes: number
}
export type ActionProfileReducerType =
    ReturnType<typeof addPost>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatusUpdates>
