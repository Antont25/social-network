let initialState = {
    menuIsShow: false,
}

export const headerReducer = (state = initialState, action: ActionHeaderReducerType): InitialStateType => {
    switch (action.type) {
        case 'SHOW_MENU':
            return {
                ...state,
                menuIsShow: !state.menuIsShow
            }
        default:
            return state
    }
}

//action
export const showMenuHandler = () => ({type: 'SHOW_MENU'} as const)

//type
export type ActionHeaderReducerType = ReturnType<typeof showMenuHandler>
type InitialStateType = typeof initialState

