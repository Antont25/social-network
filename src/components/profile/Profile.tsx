import React from 'react';
import {MyPosts} from "./myPosts/MyPosts";

import {connect} from "react-redux";
import {AppStoreType,} from "../../redux/store";
import {addPostState, newTextPost, PostsType} from "../../redux/profileReduser";
import {Dispatch} from "redux";

type MapStateToPropsType = {
    posts: Array<PostsType>,
    newPostText: string
}
type MapDispatchToPropsType = {
    addPostState: () => void
    newTextPost: (newText: string) => void
}
type ProfileType = MapStateToPropsType & MapDispatchToPropsType

const Profile = (props: ProfileType) => {
    return (
        <div>
            <MyPosts newPostText={props.newPostText}
                     posts={props.posts}
                     addPostState={props.addPostState}
                     newTextPost={props.newTextPost}
            />
        </div>
    );
};

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => {
    return {
        posts: state.postPage.posts,
        newPostText: state.postPage.newPostText
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPostState: () => dispatch(addPostState()),
        newTextPost: (newText: string) => dispatch(newTextPost(newText))
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStoreType>(mapStateToProps, mapDispatchToProps)(Profile);