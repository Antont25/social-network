import React from 'react';
import {ActionType, PostsType, PostType} from "./state";

export  const DialogsReduser = (state:PostType, action:ActionType) => {
    switch (action.type) {
        case  ADD_POST:
            let newPost: PostsType = {
                id: 4,
                massage: state.newPostText,
                likes: 4
            }
            return state.posts.push(newPost)

        case NEW_TEXT : {
           return  state.newPostText = action.newText
        }
        default: return state
    }
};



const ADD_POST = 'ADD_POST';
const NEW_TEXT = 'NEW_TEXT';

export  const addPostState=()=>({type: ADD_POST} as const )
export  const newTextPost=(newText:string)=>({type: NEW_TEXT,newText:newText} as const)