import {ActionType} from "./store";

type InitialStateType = typeof initialState
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
type SetUsersType = {
    type: typeof SET_USERS
    payload: Array<UserType>
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
const initialState = {
    users: [
        {
            name: "Shubert",
            id: 1,
            uniqueUrlName: null,
            photos: {
                small: null,
                large: null
            },
            status: null,
            followed: false
        },
        {
            name: "Hacker",
            id: 2,
            photos: {
                small: null,
                large: null
            },
            status: null,
            followed: false
        }
    ] as Array<UserType>,
    totalCount: 30,
    error: null
}


export const usersReduser = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(item => item.id === action.payload ? {...item, followed: true} : item)
            }
        case UN_FOLLOW:
            return {
                ...state,
                users: state.users.map(item => item.id === action.payload ? {...item, followed: false} : item)
            }
        default:
            return state
    }
}

export const setUsers = (payload: Array<UserType>): SetUsersType => ({type: SET_USERS, payload})
export const follow = (payload: number): FollowType => ({type: FOLLOW, payload})
export const unFollow = (payload: number): UnFollowType => ({type: UN_FOLLOW, payload})


