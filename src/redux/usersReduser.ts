import {ActionType} from "./store";

export type InitialStateUserPageType = {
    items: Array<UserType>
    totalCount: number
    pageSize: number
    currentPage: number
    error: null
    portionsNumber: number
}
export type UserType = {
    name: string,
    id: number,
    photos: {
        small: null | string,
        large: null | string
    },
    status: null | string,
    followed: boolean
}
export type FetchUserType = {
    items: Array<UserType>
    totalCount: number
    error: null
}
type FollowType = {
    type: typeof FOLLOW
    payload: number
}
type UnFollowType = {
    type: typeof UN_FOLLOW
    payload: number
}


const SET_USERS = 'SET_USERS'
const FOLLOW = 'FOLLOW'
const UN_FOLLOW = 'UN_FOLLOW'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_PORTION_NUMBER = 'SET_PORTION_NUMBER'
const initialStateUserPage = {
    items: [] as Array<UserType>,
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    portionsNumber: 1,
    error: null
}


export const usersReducer = (state = initialStateUserPage, action: ActionType): InitialStateUserPageType => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                items: action.payload.items,
                totalCount: action.payload.totalCount,
                error: action.payload.error
            }
        case FOLLOW:
            return {
                ...state,
                items: state.items.map(item => item.id === action.payload ? {...item, followed: true} : item)
            }
        case UN_FOLLOW:
            return {
                ...state,
                items: state.items.map(item => item.id === action.payload ? {...item, followed: false} : item)
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case SET_PORTION_NUMBER:
            return {
                ...state,
                portionsNumber: action.payload
            }
        default:
            return state
    }
}

export const setUsers = (payload: FetchUserType) => ({type: SET_USERS, payload} as const)
export const follow = (payload: number) => ({type: FOLLOW, payload} as const)
export const unFollow = (payload: number) => ({type: UN_FOLLOW, payload} as const)
export const setCurrentPage = (payload: number) => ({type: SET_CURRENT_PAGE, payload} as const)
export const setPortionsNumber = (payload: number) => ({type: SET_PORTION_NUMBER, payload} as const)


