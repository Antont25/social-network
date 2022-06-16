import React from 'react';
import {ActionType} from "./store";


export type InitialSateType = typeof initialSate
type AddPostStateType = {
    type: typeof ADD_POST
}
type NewTextPostType = {
    type: typeof NEW_TEXT
    payload: string
}
export type PostsType = {
    id: number
    massage: string
    likes: number
}

const ADD_POST = 'ADD_POST';
const NEW_TEXT = 'NEW_TEXT';
const initialSate = {
    posts: [
        {id: 1, massage: "sacasc", likes: 4},
        {id: 2, massage: "sacasc", likes: 4},
        {id: 3, massage: "sacasc", likes: 4},
        {id: 4, massage: "sacasc", likes: 4},
    ] as Array<PostsType>,
    newPostText: ''
}

export const profileReduser = (state = initialSate, action: ActionType): InitialSateType => {
    switch (action.type) {
        case ADD_POST :
            let newPost: PostsType = {
                id: 4,
                massage: state.newPostText,
                likes: 4
            }
            return {
                ...state,
                posts: [newPost, ...state.posts],
            }

        case NEW_TEXT :
            return {
                ...state,
                newPostText: action.payload
            }
        default:
            return state
    }
};


export const addPostState = (): AddPostStateType => ({type: ADD_POST})
export const newTextPost = (payload: string): NewTextPostType => ({type: NEW_TEXT, payload})

