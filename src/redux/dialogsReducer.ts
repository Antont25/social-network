type InitialStateType = typeof initialState
export type DialogsType = {
    id: number
    name: string
}
export type MessagesType = {
    id: number
    message: string
}
export type ActionDialogsReducerType = ReturnType<typeof addMessage>

const initialState = {
    dialogs: [
        {id: 1, name: 'Amdrey'},
        {id: 2, name: 'Any'}
    ] as Array<DialogsType>,
    messages: [
        {id: 1, message: 'yoooo'},
        {id: 1, message: 'ysss'},
    ] as Array<MessagesType>,
}

export const dialogsReducer = (state = initialState, action: ActionDialogsReducerType): InitialStateType => {
    switch (action.type) {
        case  'ADD_MESSAGE':
            let newMessages: MessagesType = {id: 3, message: action.payload}
            return {
                ...state,
                messages: [newMessages, ...state.messages]
            }

        default:
            return state
    }
};


export const addMessage = (payload: string) => ({type: 'ADD_MESSAGE', payload} as const)
