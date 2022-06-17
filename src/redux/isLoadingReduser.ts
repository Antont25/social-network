import {ActionType} from "./store";


type InitialStateType = typeof initialState
type IsLoadingType = {
    type: typeof IS_LOADING
}

let initialState = {
    isLoading: true
}

const IS_LOADING = 'IS_LOADING'

export const isLoadingReduser = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case IS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        default:
            return state
    }
}

export const isLoading = (): IsLoadingType => ({type: IS_LOADING})

