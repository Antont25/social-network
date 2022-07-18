import {api} from "../api/api";
import {setIsLoading} from "./authorizedReducer";
import {AppThunk} from "./store";


export type InitialSateType = typeof initialSate
type AddPostStateType = {
    type: typeof ADD_POST
}
type NewTextPostType = {
    type: typeof NEW_TEXT
    payload: string
}

export type PostsType = {
    id: number
    massage: string
    likes: number
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
export type ActionProfileReducerType =
    ReturnType<typeof addPostState>
    | ReturnType<typeof newTextPost>
    | ReturnType<typeof setUserProfile>


const ADD_POST = 'ADD_POST';
const NEW_TEXT = 'NEW_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const initialSate = {
    posts: [
        {id: 1, massage: "sacasc", likes: 4},
        {id: 2, massage: "sacasc", likes: 4},
        {id: 3, massage: "sacasc", likes: 4},
        {id: 4, massage: "sacasc", likes: 4},
    ] as Array<PostsType>,
    userProfile: {} as UserProfileType,
    newPostText: ''
}

export const profileReducer = (state = initialSate, action: ActionProfileReducerType): InitialSateType => {
    switch (action.type) {
        case ADD_POST :
            let newPost: PostsType = {
                id: 4,
                massage: state.newPostText,
                likes: 4
            }
            return {
                ...state,
                posts: [newPost, ...state.posts],
            }

        case NEW_TEXT :
            return {
                ...state,
                newPostText: action.payload
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.payload
            }
        default:
            return state
    }
};


export const addPostState = () => ({type: ADD_POST} as const)
export const newTextPost = (payload: string) => ({type: NEW_TEXT, payload} as const)
export const setUserProfile = (payload: UserProfileType) => ({type: SET_USER_PROFILE, payload} as const)


export const fetchUserProfileData = (paramsURL: number): AppThunk => async dispatch => {
    try {
        dispatch(setIsLoading(true))
        if (paramsURL) {
            let response = await api.getUserProfile(paramsURL)
            dispatch(setUserProfile(response))
        }
    } catch (error) {
        console.log(error)
    } finally {
        dispatch(setIsLoading(false))
    }
}