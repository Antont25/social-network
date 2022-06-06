import React from 'react';
import {ActionType, MassagesType} from "./state";

type InitialStateType=typeof initialState
type NewMessageTextType={
    type: 'NEW_MESSAGE_TEXT'
    newText:string
}
type AddMessageType={
    type: 'ADD_MESSAGE'
}

const initialState={
    dialogs: [
        {id: 1, name: 'Amdrey'},
        {id: 2, name: 'Any'}
    ],
    massages: [
        {id: 1, message: 'yoooo'},
        {id: 1, message: 'ysss'},
    ],
    newTextMasseg:'f'
}

export  const dialogsReduser = (state:InitialStateType = initialState, action:ActionType) => {
    switch (action.type) {
        case  ADD_MESSAGE:
            let newMessage:MassagesType = {id:3,message: state.newTextMasseg}
            return {
                ...state,
                massages:[newMessage,...state.massages]
            }

        case NEW_MESSAGE_TEXT :
        return {
            ...state,
            newTextMasseg: action.newText
        }
        default: return state
    }
};



const NEW_MESSAGE_TEXT= 'NEW_MESSAGE_TEXT';
const ADD_MESSAGE = "ADD_MESSAGE";


export  const newMessageText=(newText:string):NewMessageTextType=>({type: NEW_MESSAGE_TEXT,newText:newText} as const)
export  const addMessage=():AddMessageType=>({type: ADD_MESSAGE} as const )
