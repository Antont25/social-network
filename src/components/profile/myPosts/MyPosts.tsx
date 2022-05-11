import React from 'react';
import {AddPost} from "./addPost/AddPost";
import {MyPost} from "./myPost/MyPost";
import {Description} from "../descripton/Description";
import UserInfo from "../userInfo/UserInfo";

export const MyPosts = () => {

    let posts =[
        {id:1, massage:"sacasc", likes:4},
        {id:2, massage:"sacasc", likes:4},
        {id:3, massage:"sacasc", likes:4},
        {id:4, massage:"sacasc", likes:4},
    ]

    let newPost=posts.map(item=> <MyPost key={item.id} massage={item.massage} likes={item.likes}/>)
    return (
        <div>
            <Description/>
            <UserInfo/>
            <AddPost/>
            {newPost}
        </div>
    );
};

