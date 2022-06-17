import {ActionType} from "./store";


type InitialStateType = {
    menuIsShow: boolean
    screenWidth: null | number
}
type ShowMenuType = {
    type: typeof SHOW_MENU
}
type ScreenWidthType = {
    type: typeof SCREEN_WIDTH
    payload: number
}

let initialState = {
    menuIsShow: true,
    screenWidth: null
}

const SHOW_MENU = 'SHOW_MENU'
const SCREEN_WIDTH = 'SCREEN_WIDTH'

export const headerReduser = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case SHOW_MENU:
            return {
                ...state,
                menuIsShow: !state.menuIsShow
            }
        case SCREEN_WIDTH:
            return {
                ...state,
                screenWidth: action.payload
            }
        default:
            return state
    }
}

export const showMenuHandler = (): ShowMenuType => ({type: SHOW_MENU})
export const screenWidthHandler = (payload: number): ScreenWidthType => ({type: SCREEN_WIDTH, payload})

