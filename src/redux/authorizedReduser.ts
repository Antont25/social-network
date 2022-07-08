import {UserProfileType} from "./profileReduser";

export type AuthorizedUserType = {
    id: null | number
    email: null | string
    login: null | string

}


type InitialStateType = typeof initialState
let initialState = {
    isLoading: false,
    authorized: null as number | null,
    authorizedUser: {
        id: null,
        email: null,
        login: null
    } as AuthorizedUserType,
    authorizedProfileUser: {
        photos: {small: null}
    } as UserProfileType
}

const IS_LOADING = 'IS_LOADING'
const SET_AUTHORIZED_USER = 'SET_AUTHORIZED_USER'
const SET_AUTHORIZED_CODE = 'SET_AUTHORIZED_CODE'
const SET_AUTHORIZED_PROFILE_USER = 'SET_AUTHORIZED_PROFILE_USER'

export const authorizedReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case SET_AUTHORIZED_USER:
            return {
                ...state,
                authorizedUser: {...action.payload},
            }
        case SET_AUTHORIZED_PROFILE_USER:
            return {
                ...state,
                authorizedProfileUser: action.payload
            }
        case SET_AUTHORIZED_CODE:
            return {
                ...state,
                authorized: action.payload
            }
        default:
            return state
    }
}

type ActionType = ReturnType<typeof setIsLoading>
    | ReturnType<typeof setAuthorizedUser>
    | ReturnType<typeof setAuthorizedProfileUser>
    | ReturnType<typeof setAuthorizedCode>


export const setIsLoading = (payload: boolean) => ({type: IS_LOADING, payload}) as const
export const setAuthorizedUser = (payload: AuthorizedUserType) => ({type: SET_AUTHORIZED_USER, payload}) as const
export const setAuthorizedCode = (payload: number) => ({type: SET_AUTHORIZED_CODE, payload}) as const
export const setAuthorizedProfileUser = (payload: UserProfileType) => ({
    type: SET_AUTHORIZED_PROFILE_USER,
    payload
}) as const

