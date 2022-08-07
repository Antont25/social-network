import {api, AuthorizedUserType, UserProfileType} from '../api/api';
import {AppThunk} from './store';

let initialStateAuthorized = {
    isLoading: false,
    authorizedStatus: 'initialization' as StatusAuthorizedType,
    authorizedUser: {
        id: null,
        email: null,
        login: null
    } as AuthorizedUserType,
    authorizedProfileUser: {
        photos: {small: null}
    } as UserProfileType,
}

export const authorizedReducer = (state = initialStateAuthorized, action: ActionAuthorizedReducerType): InitialStateTypeAuthorized => {
    switch (action.type) {
        case 'AUTHORIZED/IS_LOADING':
            return {
                ...state,
                isLoading: action.payload
            }
        case 'AUTHORIZED/SET_AUTHORIZED_USER':
            return {
                ...state,
                authorizedUser: {...action.user},
            }
        case 'AUTHORIZED/SET_AUTHORIZED_PROFILE_USER':
            return {
                ...state,
                authorizedProfileUser: action.payload
            }
        case 'AUTHORIZED/SET_AUTHORIZED_STATUS':
            return {
                ...state,
                authorizedStatus: action.payload
            }
        default:
            return state
    }
}

//action
export const setIsLoading = (payload: boolean) => ({type: 'AUTHORIZED/IS_LOADING', payload} as const)
export const setAuthorizedUser = (user: AuthorizedUserType) => ({type: 'AUTHORIZED/SET_AUTHORIZED_USER', user} as const)
export const setAuthorizedStatus = (payload: StatusAuthorizedType) =>
    ({type: 'AUTHORIZED/SET_AUTHORIZED_STATUS', payload} as const)
export const setAuthorizedProfileUser = (payload: UserProfileType) =>
    ({type: 'AUTHORIZED/SET_AUTHORIZED_PROFILE_USER', payload} as const)

//thunk
export const fetchAuthorizedData = (): AppThunk => async dispatch => {
    try {
        dispatch(setIsLoading(true))
        let response = await api.authorizedMe()
        if (response.resultCode === 0) {
            dispatch(setAuthorizedUser(response.data))
            dispatch(setAuthorizedStatus('successfully'))
            if (response.data.id) {
                let responseUser = await api.getUserProfile(response.data.id)
                dispatch(setAuthorizedProfileUser(responseUser))
            }
        } else {
            dispatch(setAuthorizedStatus('fail'))
        }
    } catch (error) {
        console.log(error)
    } finally {
        dispatch(setIsLoading(false))
    }
}
export const fetchAuthorization = (email: string, password: string, setStatus: any): AppThunk => async dispatch => {
    try {
        dispatch(setIsLoading(true))
        let response = await api.authorize(email, password)
        if (response.resultCode === 0) {
            dispatch(fetchAuthorizedData())
        } else if (response.resultCode !== 0) {
            setStatus(response.messages[0])
        }
    } catch (error) {
        console.log(error)
    } finally {
        dispatch(setIsLoading(false))
    }
}
export const fetchLogout = (): AppThunk => async dispatch => {
    try {
        dispatch(setIsLoading(true))
        let response = await api.logout()
        if (response.resultCode === 0) {
            dispatch(fetchAuthorizedData())
        }
    } catch (error) {
        console.log(error)
    } finally {
        dispatch(setIsLoading(false))
    }
}

//type
export type InitialStateTypeAuthorized = typeof initialStateAuthorized
export type StatusAuthorizedType = 'successfully' | 'initialization' | 'fail'
export type ActionAuthorizedReducerType =
    ReturnType<typeof setIsLoading>
    | ReturnType<typeof setAuthorizedUser>
    | ReturnType<typeof setAuthorizedStatus>
    | ReturnType<typeof setAuthorizedProfileUser>

