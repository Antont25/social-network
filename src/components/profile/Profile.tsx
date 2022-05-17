import React from 'react';
import {MyPosts} from "./myPosts/MyPosts";
import {PostPageType} from "../../redux/state";

const Profile = (props:PostPageType) => {
    return (
        <div >
            <MyPosts posts={props.posts} addPost={props.addPost}/>
        </div>
    );
};

export default Profile;