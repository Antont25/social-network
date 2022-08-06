import {api, UserProfileType} from '../api/api';
import {setIsLoading} from './authorizedReducer';
import {AppThunk} from './store';


export type InitialSateType = typeof initialSate

const initialSate = {
    posts: [
        {id: 1, massage: 'sacasc', likes: 4},
        {id: 2, massage: 'sacasc', likes: 4},
        {id: 3, massage: 'sacasc', likes: 4},
        {id: 4, massage: 'sacasc', likes: 4},
    ] as Array<PostsType>,
    userProfile: {} as UserProfileType,
    userStatus: null as null | string
}

export const profileReducer = (state = initialSate, action: ActionProfileReducerType): InitialSateType => {
    switch (action.type) {
        case 'ADD_POST' :
            let newPost: PostsType = {
                id: 4,
                massage: action.payload,
                likes: 4
            }
            return {
                ...state,
                posts: [newPost, ...state.posts],
            }
        case 'SET_USER_PROFILE':
            return {
                ...state,
                userProfile: action.payload
            }
        case 'SET_STATUS_UPDATES':
            return {
                ...state,
                userStatus: action.payload
            }
        default:
            return state
    }
};

//action
export const addPost = (payload: string) => ({type: 'ADD_POST', payload} as const)
export const setUserProfile = (payload: UserProfileType) => ({type: 'SET_USER_PROFILE', payload} as const)
export const setStatusUpdates = (payload: string | null) => ({type: 'SET_STATUS_UPDATES', payload} as const)

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
export type PostsType = {
    id: number
    massage: string
    likes: number
}
export type ActionProfileReducerType =
    ReturnType<typeof addPost>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatusUpdates>
