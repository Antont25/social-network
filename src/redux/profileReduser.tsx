import React from 'react';
import {ActionType, PostsType} from "./state";

const ADD_POST = 'ADD_POST';
const NEW_TEXT = 'NEW_TEXT';

type InitialSateType = typeof initialSate
type AddPostStateType = {
    type: 'ADD_POST'
}
type NewTextPostType = {
    type: 'NEW_TEXT'
    newText: string
}


const initialSate = {
    posts: [
        {id: 1, massage: "sacasc", likes: 4},
        {id: 2, massage: "sacasc", likes: 4},
        {id: 3, massage: "sacasc", likes: 4},
        {id: 4, massage: "sacasc", likes: 4},
    ],
    newPostText: 'a'
}

export const profileReduser = (state:InitialSateType = initialSate, action: ActionType) => {
    switch (action.type) {
        case ADD_POST :
            let newPost: PostsType = {
                id: 4,
                massage: state.newPostText,
                likes: 4
            }
            return {
                ...state,
                posts: [newPost, ...state.posts]
            }

        case NEW_TEXT :
            return {
                ...state,
                newPostText:  action.newText
            }
        default:
            return state
    }
};



export const addPostState = ():AddPostStateType => ({type: ADD_POST} as const)
export const newTextPost = (newText: string):NewTextPostType => ({type: NEW_TEXT, newText} )

