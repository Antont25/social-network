import {ActionType} from "./store";


type InitialStateType = typeof initialState
type ShowMenuType = {
    type: typeof SHOW_MENU
}

let initialState = {
    menuIsShow: false,
}

const SHOW_MENU = 'SHOW_MENU'

export const headerReduser = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SHOW_MENU:
            return {
                ...state,
                menuIsShow: !state.menuIsShow
            }
        default:
            return state
    }
}

export const showMenuHandler = (): ShowMenuType => ({type: SHOW_MENU})

