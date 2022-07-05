import {ActionType} from "./store";


type InitialStateType = typeof initialState
let initialState = {
    isLoading: false,
    authorized: true
}

const IS_LOADING = 'IS_LOADING'

export const isLoadingReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state
    }
}

export const setIsLoading = (payload: boolean) => ({type: IS_LOADING, payload} as const)

