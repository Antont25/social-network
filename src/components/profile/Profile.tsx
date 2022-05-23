import React from 'react';
import {MyPosts} from "./myPosts/MyPosts";
import {PostPageType} from "../../redux/state";

const Profile = (props:PostPageType) => {
    return (
        <div >
            <MyPosts newPostText={props.newPostText}
                     posts={props.posts}
                     dispatch={props.dispatch}/>
        </div>
    );
};

export default Profile;