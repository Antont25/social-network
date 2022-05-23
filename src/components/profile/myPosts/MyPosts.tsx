import React from 'react';
import {AddPost} from "./addPost/AddPost";
import {MyPost} from "./myPost/MyPost";
import {Description} from "../descripton/Description";
import UserInfo from "../userInfo/UserInfo";
import {PostPageType} from "../../../redux/state";

export const MyPosts = (props:PostPageType) => {


    let newPost=props.posts.map(item=> <MyPost key={item.id} massage={item.massage} likes={item.likes}/>)
    return (
        <div>
            <Description/>
            <UserInfo/>
            <AddPost newPostText={props.newPostText}
                     dispatch={props.dispatch}/>
            {newPost}
        </div>
    );
};

