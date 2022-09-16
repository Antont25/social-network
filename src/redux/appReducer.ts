import {api, AuthorizedUserType, UserProfileType} from '../api/api';
import {AppThunk} from './store';
import axios, {AxiosError} from 'axios';
import {errorFromStatusCodeOrApplication} from '../utils/error-utils';
import {updateAvatarSuccess} from './profileReducer';

let initialStateApp = {
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
    serverError: null as null | string,
    captchaUrl: null as null | string,
}

export const appReducer = (state = initialStateApp, action: ActionAppReducerType): InitialStateTypeApp => {
    switch (action.type) {
        case 'APP/IS_LOADING':
            return {
                ...state,
                isLoading: action.payload
            }
        case 'APP/SET_AUTHORIZED_USER':
            return {
                ...state,
                authorizedUser: {...action.user},
            }
        case 'APP/SET_AUTHORIZED_PROFILE_USER':
            return {
                ...state,
                authorizedProfileUser: action.payload
            }
        case 'APP/SET_AUTHORIZED_STATUS':
            return {
                ...state,
                authorizedStatus: action.payload
            }
        case 'APP/SET_SERVER_ERROR':
            return {...state, serverError: action.payload}
        case 'PROFILE/UPDATE_AVATAR_SUCCESS': {
            const photos = {...action.payload}
            return {
                ...state,
                authorizedProfileUser: {
                    ...state.authorizedProfileUser,
                    photos: photos
                }
            }
        }
        case 'APP/SET_CAPTCHA_URL':
            return {
                ...state,
                captchaUrl: action.payload
            }
        default:
            return state
    }
}

//action
export const setIsLoading = (payload: boolean) =>
    ({type: 'APP/IS_LOADING', payload} as const)
export const setAuthorizedUser = (user: AuthorizedUserType) =>
    ({type: 'APP/SET_AUTHORIZED_USER', user} as const)
export const setAuthorizedStatus = (payload: StatusAuthorizedType) =>
    ({type: 'APP/SET_AUTHORIZED_STATUS', payload} as const)
export const setAuthorizedProfileUser = (payload: UserProfileType) =>
    ({type: 'APP/SET_AUTHORIZED_PROFILE_USER', payload} as const)
export const setServerError = (payload: string | null) =>
    ({type: 'APP/SET_SERVER_ERROR', payload} as const)
export const setCaptchaURl = (payload: string | null) =>
    ({type: 'APP/SET_CAPTCHA_URL', payload} as const)

//thunk
export const fetchAuthorizedData = (): AppThunk => async dispatch => {
    try {
        dispatch(setIsLoading(true))
        let res = await api.authorizedMe()
        if (res.resultCode === 0) {
            dispatch(setAuthorizedUser(res.data))
            dispatch(setAuthorizedStatus('successfully'))
            if (res.data.id) {
                let responseUser = await api.getUserProfile(res.data.id)
                dispatch(setAuthorizedProfileUser(responseUser))
            }
        } else {
            dispatch(setAuthorizedStatus('fail'))
        }
    } catch (e) {
        const error = e as Error | AxiosError
        errorFromStatusCodeOrApplication(error, dispatch)
    } finally {
        dispatch(setIsLoading(false))
    }
}
export const fetchAuthorization = (email: string, password: string, setStatus: any, captcha: string): AppThunk => async dispatch => {
    try {
        dispatch(setIsLoading(true))
        let res = await api.authorize(email, password, captcha)
        if (res.resultCode === 0) {
            dispatch(fetchAuthorizedData())
            dispatch(setCaptchaURl(null))
        } else if (res.resultCode === 10) {
            dispatch(fetchCaptchaURL())
        } else if (res.resultCode !== 0) {
            dispatch(setServerError(res.messages[0]))
            setStatus(res.messages[0])
        }
    } catch (e) {
        const error = e as Error | AxiosError
        errorFromStatusCodeOrApplication(error, dispatch)
    } finally {
        dispatch(setIsLoading(false))
    }
}
export const fetchLogout = (): AppThunk => async dispatch => {
    try {
        dispatch(setIsLoading(true))
        let res = await api.logout()
        if (res.resultCode === 0) {
            dispatch(fetchAuthorizedData())
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
const fetchCaptchaURL = (): AppThunk => async dispatch => {
    try {
        dispatch(setIsLoading(true))
        let res = await api.getCaptchaURL()
        dispatch(setCaptchaURl(res.url))
    } catch (e) {
        const error = e as Error | AxiosError
        errorFromStatusCodeOrApplication(error, dispatch)
    } finally {
        dispatch(setIsLoading(false))
    }
}

//type
export type InitialStateTypeApp = typeof initialStateApp
export type StatusAuthorizedType = 'successfully' | 'initialization' | 'fail'
export type ActionAppReducerType =
    ReturnType<typeof setIsLoading>
    | ReturnType<typeof setAuthorizedUser>
    | ReturnType<typeof setAuthorizedStatus>
    | ReturnType<typeof setAuthorizedProfileUser>
    | ReturnType<typeof setServerError>
    | ReturnType<typeof updateAvatarSuccess>
    | ReturnType<typeof setCaptchaURl>

