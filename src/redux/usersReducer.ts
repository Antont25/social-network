import {api, FetchUserType, UserType} from '../api/api';
import {setIsLoading, setServerError} from './appReducer';
import {AppThunk} from './store';
import {AxiosError} from 'axios';
import {errorFromStatusCodeOrApplication} from '../common/utils/error-utils';

const initialStateUserPage = {
    items: [] as Array<UserType>,
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    portionsNumber: 1,
    error: null,
    userSubscription: [] as Array<number>
}

export const usersReducer = (state = initialStateUserPage, action: ActionUserReducerType): InitialStateUserPageType => {
    switch (action.type) {
        case 'USERS/SET_USERS':
            return {
                ...state,
                items: action.payload.items,
                totalCount: action.payload.totalCount,
                error: action.payload.error
            }
        case 'USERS/FOLLOW':
            return {
                ...state,
                items: state.items.map(item => item.id === action.payload
                    ? {...item, followed: true}
                    : item)
            }
        case 'USERS/UN_FOLLOW':
            return {
                ...state,
                items: state.items.map(item => item.id === action.payload
                    ? {...item, followed: false}
                    : item)
            }
        case 'USERS/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.payload
            }
        case 'USERS/SET_PORTION_NUMBER':
            return {
                ...state,
                portionsNumber: action.payload
            }
        case 'USERS/ADD_USER_SUBSCRIPTION':
            return {
                ...state,
                userSubscription: action.isFollowing
                    ? [...state.userSubscription, action.userId]
                    : state.userSubscription.filter(item => item !== action.userId)
            }
        default:
            return state
    }
}

//action
export const setUsers = (payload: FetchUserType) => ({type: 'USERS/SET_USERS', payload} as const)
export const follow = (payload: number) => ({type: 'USERS/FOLLOW', payload} as const)
export const unFollow = (payload: number) => ({type: 'USERS/UN_FOLLOW', payload} as const)
export const setCurrentPage = (payload: number) => ({type: 'USERS/SET_CURRENT_PAGE', payload} as const)
export const setPortionsNumber = (payload: number) => ({type: 'USERS/SET_PORTION_NUMBER', payload} as const)
export const setUserSubscription = (userId: number, isFollowing: boolean) =>
    ({type: 'USERS/ADD_USER_SUBSCRIPTION', userId, isFollowing} as const)

//thunk
export const fetchUserData = (currentPage: number): AppThunk => async dispatch => {
    try {
        dispatch(setIsLoading(true))
        let response = await api.getUser(currentPage)
        dispatch(setUsers(response))
    } catch (e) {
        const error = e as Error | AxiosError
        errorFromStatusCodeOrApplication(error, dispatch)
    } finally {
        dispatch(setIsLoading(false))
    }

}
export const fetchFollowUser = (usersId: number): AppThunk => async dispatch => {
    try {
        dispatch(setUserSubscription(usersId, true))
        let res = await api.followUser(usersId)
        if (res.resultCode === 0) {
            dispatch(follow(usersId))
        } else {
            dispatch(setServerError(res.messages[0]))
        }
    } catch (e) {
        const error = e as Error | AxiosError
        errorFromStatusCodeOrApplication(error, dispatch)
    } finally {
        dispatch(setUserSubscription(usersId, false))
    }
}
export const fetchUnFollowUser = (usersId: number): AppThunk => async dispatch => {
    try {
        dispatch(setUserSubscription(usersId, true))
        let res = await api.unFollowUser(usersId)
        if (res.resultCode === 0) {
            dispatch(unFollow(usersId))
        } else {
            dispatch(setServerError(res.messages[0]))
        }
    } catch (e) {
        const error = e as Error | AxiosError
        errorFromStatusCodeOrApplication(error, dispatch)
    } finally {
        dispatch(setUserSubscription(usersId, false))
    }
}

//type
export type InitialStateUserPageType = {
    items: Array<UserType>
    totalCount: number
    pageSize: number
    currentPage: number
    error: null
    portionsNumber: number
    userSubscription: Array<number>
}
export type ActionUserReducerType = ReturnType<typeof setUsers>
    | ReturnType<typeof follow>
    | ReturnType<typeof unFollow>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setPortionsNumber>
    | ReturnType<typeof setUserSubscription>






