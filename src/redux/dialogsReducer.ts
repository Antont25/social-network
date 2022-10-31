import {ChatApi, MessageType} from '../api/chat-api';
import {AppThunk} from './store';
import {Dispatch} from 'redux';

type InitialStateType = typeof initialState
export type DialogsType = {
    id: number
    name: string
}

export type ActionDialogsReducerType = ReturnType<typeof setMessage>

const initialState = {
    dialogs: [
        {id: 1, name: 'Amdrey'},
        {id: 2, name: 'Any'}
    ] as Array<DialogsType>,
    messages: [] as MessageType[],
}

export const dialogsReducer = (state = initialState, action: ActionDialogsReducerType): InitialStateType => {
    switch (action.type) {
        case  'DIALOGS/ADD_MESSAGE':
            const newMessage = action.payload ? [...state.messages, ...action.payload] : []
            return {
                ...state,
                messages: newMessage
            }

        default:
            return state
    }
};


export const setMessage = (payload: MessageType[] | null) => ({type: 'DIALOGS/ADD_MESSAGE', payload} as const)


const newMessage = (dispatch: Dispatch) => (message: MessageType[] | null) => {
    dispatch(setMessage(message))
}

export const createChatWS = (): AppThunk => dispatch => {
    ChatApi.stop()
    ChatApi.start()
    ChatApi.subscriber(newMessage(dispatch))
}

export const addMessage = (message: string): AppThunk => dispatch => {
    ChatApi.setNewMessage(message)
}

export const removeChatWS = (): AppThunk => dispatch => {
    ChatApi.stop()
}
