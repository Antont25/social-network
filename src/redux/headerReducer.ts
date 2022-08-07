const initialStateHeader = {
    menuIsShow: false,
}

export const headerReducer = (state = initialStateHeader, action: ActionHeaderReducerType): InitialStateHeaderType => {
    switch (action.type) {
        case 'HEADER/SHOW_MENU':
            return {
                ...state,
                menuIsShow: !state.menuIsShow
            }
        default:
            return state
    }
}

//action
export const showMenuHandler = () => ({type: 'HEADER/SHOW_MENU'} as const)

//type
export type ActionHeaderReducerType = ReturnType<typeof showMenuHandler>
export type InitialStateHeaderType = typeof initialStateHeader

