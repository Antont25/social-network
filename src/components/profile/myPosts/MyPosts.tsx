import React from 'react';
import {AddPost} from "./addPost/AddPost";
import {MyPost} from "./myPost/MyPost";
import {Description} from "../descripton/Description";
import UserInfo from "../userInfo/UserInfo";
import {PostsType} from "../../../redux/profileReduser";

type PostPageType = {
    posts: Array<PostsType>
    newPostText: string
    addPostState: () => void
    newTextPost: (newText: string) => void
}
export const MyPosts = (props: PostPageType) => {


    let newPost = props.posts.map(item => <MyPost key={item.id} massage={item.massage} likes={item.likes}/>)
    return (
        <div>
            <Description/>
            <UserInfo/>
            <AddPost newPostText={props.newPostText}
                     addPostState={props.addPostState}
                     newTextPost={props.newTextPost}
            />
            {newPost}
        </div>
    );
};

