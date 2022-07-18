type InitialStateType = typeof initialState
type ShowMenuType = {
    type: typeof SHOW_MENU
}
export type ActionHeaderReducerType = ReturnType<typeof showMenuHandler>

let initialState = {
    menuIsShow: false,
}

const SHOW_MENU = 'SHOW_MENU'

export const headerReducer = (state = initialState, action: ActionHeaderReducerType): InitialStateType => {
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

