import {api, ContactsType, PhotosType, UserProfileType} from '../api/api';
import {setIsLoading, setServerError} from './appReducer';
import {AppThunk} from './store';
import {AxiosError} from 'axios';
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {errorFromStatusCodeOrApplication} from '../common/utils/error-utils';
import actions from 'redux-form/lib/actions';

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

export const profileSlice = createSlice({
    name: 'profile',
    initialState: initialSateProfile,
    reducers: {
        addPost: (state, action: PayloadAction<string>) => {
            let newPost: PostsType = {
                id: 23,
                massage: action.payload,
                likes: 0
            }
            state.posts.unshift(newPost)
        },
        setUserProfile: (state, actions: PayloadAction<UserProfileType>) => {
            state.userProfile = actions.payload
        },
        setStatusUpdates: (state, actions: PayloadAction<string | null>) => {
            state.userStatus = actions.payload
        },
        updateAvatarSuccess: (state, actions: PayloadAction<PhotosType>) => {
            state.userProfile.photos = actions.payload
        },
    }
})
export const profileReducer = profileSlice.reducer
export const {addPost, setUserProfile, setStatusUpdates, updateAvatarSuccess} = profileSlice.actions

// export const profileReducer = (state = initialSateProfile, action: ActionProfileReducerType): InitialSateProfileType => {
//     switch (action.type) {
// case 'PROFILE/ADD_POST' :
//     let newPost: PostsType = {
//         id: 23,
//         massage: action.payload,
//         likes: 0
//     }
//     return {
//         ...state,
//         posts: [newPost, ...state.posts],
//     }
// case 'PROFILE/SET_USER_PROFILE':
//     return {
//         ...state,
//         userProfile: action.payload
//     }
// case 'PROFILE/SET_STATUS_UPDATES':
//     return {
//         ...state,
//         userStatus: action.payload
//     }
//         case 'PROFILE/UPDATE_AVATAR_SUCCESS':
//             return {
//                 ...state,
//                 userProfile: {...state.userProfile, photos: action.payload}
//             }
//         default:
//             return state
//     }
// };

//action
// export const addPost = (payload: string) =>
//     ({type: 'PROFILE/ADD_POST', payload} as const)
// export const setUserProfile = (payload: UserProfileType) =>
//     ({type: 'PROFILE/SET_USER_PROFILE', payload} as const)
// export const setStatusUpdates = (payload: string | null) =>
//     ({type: 'PROFILE/SET_STATUS_UPDATES', payload} as const)
// export const updateAvatarSuccess = (payload: PhotosType) =>
//     ({type: 'PROFILE/UPDATE_AVATAR_SUCCESS', payload} as const)

//thunk
export const fetchUserProfileData = (paramsURL: number): AppThunk => async dispatch => {
    try {
        dispatch(setIsLoading(true))
        if (paramsURL) {
            const res = await api.getUserProfile(paramsURL)
            dispatch(setUserProfile(res))
            const responseStatus = await api.getStatusUser(res.userId)
            dispatch(setStatusUpdates(responseStatus))
        }
    } catch (e) {
        const error = e as Error | AxiosError
        errorFromStatusCodeOrApplication(error, dispatch)
    } finally {
        dispatch(setIsLoading(false))
    }
}
export const fetchStatusUpdates = (newStatus: string, usersId: number): AppThunk => async dispatch => {
    try {
        dispatch(setIsLoading(true))
        const res = await api.statusUpdates(newStatus)
        if (res.resultCode === 0) {
            const responseNewStatus = await api.getStatusUser(usersId)
            dispatch(setStatusUpdates(responseNewStatus))
        } else {
            dispatch(setServerError(res.messages[0]))
        }
    } catch (e) {
        const error = e as Error | AxiosError
        errorFromStatusCodeOrApplication(error, dispatch)
    } finally {
        dispatch(setIsLoading(false))
    }
}
export const updateAvatar = (image: any): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(setIsLoading(true))
        const res = await api.savePhoto(image)
        if (res.resultCode === 0) {
            dispatch(updateAvatarSuccess(res.data.photos))
        } else {
            dispatch(setServerError(res.messages[0]))
        }
    } catch (e) {
        const error = e as Error | AxiosError
        errorFromStatusCodeOrApplication(error, dispatch)
    } finally {
        dispatch(setIsLoading(false))
    }
}
export const updateDateProfile = (contacts?: ContactsType, fullName?: string): AppThunk => async (dispatch, getState: () => any) => {

    const data = {
        aboutMe: getState().profilePage.userProfile.aboutMe,
        lookingForAJobDescription: getState().profilePage.userProfile.lookingForAJobDescription,
        fullName: fullName || getState().profilePage.userProfile.fullName,
        contacts: contacts || getState().profilePage.userProfile.contacts
    }

    try {
        dispatch(setIsLoading(true))
        const res = await api.updateContacts(data)
        if (res.resultCode === 0) {
            const paramsURL = getState().app.authorizedProfileUser.userId
            dispatch(fetchUserProfileData(paramsURL))
        } else {
            dispatch(setServerError(res.messages[0]))
        }
    } catch (e) {
        const error = e as Error | AxiosError
        errorFromStatusCodeOrApplication(error, dispatch)
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
    | ReturnType<typeof updateAvatarSuccess>
