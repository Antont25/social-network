import React from 'react';
import {ActionType} from "./store";


type NewMessageTextType = {
    type: typeof NEW_MESSAGE_TEXT
    payload: string
}
type AddMessageType = {
    type: typeof ADD_MESSAGE
}
type InitialStateType = typeof initialState
export type DialogsType = {
    id: number
    name: string
}
export type MessagesType = {
    id: number
    message: string
}

const NEW_MESSAGE_TEXT = 'NEW_MESSAGE_TEXT';
const ADD_MESSAGE = "ADD_MESSAGE";

const initialState = {
    dialogs: [
        {id: 1, name: 'Amdrey'},
        {id: 2, name: 'Any'}
    ] as Array<DialogsType>,
    messages: [
        {id: 1, message: 'yoooo'},
        {id: 1, message: 'ysss'},
    ] as Array<MessagesType>,
    newTextMessages: 'f'
}

export const dialogsReduser = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case  ADD_MESSAGE:
            let newMessages: MessagesType = {id: 3, message: state.newTextMessages}
            return {
                ...state,
                messages: [newMessages, ...state.messages]
            }

        case NEW_MESSAGE_TEXT :
            return {
                ...state,
                newTextMessages: action.payload
            }
        default:
            return state
    }
};


export const newMessageText = (payload: string): NewMessageTextType => ({type: NEW_MESSAGE_TEXT, payload})
export const addMessage = (): AddMessageType => ({type: ADD_MESSAGE})
