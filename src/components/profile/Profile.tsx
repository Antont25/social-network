import React from 'react';
import {MyPosts} from "./myPosts/MyPosts";
import {PostPageType} from "../../redux/state";

const Profile = (props:PostPageType) => {
    return (
        <div >
            <MyPosts newPostText={props.newPostText}
                     posts={props.posts}
                     addPost={props.addPost}
                     changeNewPostText={props.changeNewPostText}/>
        </div>
    );
};

export default Profile;