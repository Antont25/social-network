import React, {useEffect} from 'react';
import {MyPosts} from "./myPosts/MyPosts";
import Paper from '@material-ui/core/Paper';


import {connect} from "react-redux";
import {AppStoreType,} from "../../redux/store";
import {addPostState, newTextPost, PostsType, setUserProfile, UserProfileType} from "../../redux/profileReduser";
import {Dispatch} from "redux";
import axios from "axios";
import {InitialStateUserPageType} from "../../redux/usersReduser";
import {setIsLoading} from "../../redux/isLoadingReduser";
import {Description} from "./descripton/Description";
import UserInfo from "./userInfo/UserInfo";
import {Loading} from "../../common/loading/Loading";
import {useParams} from "react-router";

type MapStateToPropsType = {
    posts: Array<PostsType>
    newPostText: string
    userProfile: UserProfileType
}
type MapDispatchToPropsType = {
    addPostState: () => void
    newTextPost: (newText: string) => void
    setIsLoading: (payload: boolean) => void
    setUserProfile: (payload: UserProfileType) => void
}

type ProfileType = MapStateToPropsType & MapDispatchToPropsType

const Profile = (props: ProfileType) => {
    let params = useParams<'*'>()
    useEffect(() => {
        async function fetchUserProfile() {
            props.setIsLoading(true)
            let response = await axios.get<UserProfileType>(`https://social-network.samuraijs.com/api/1.0//profile/${params['*']}`)
            props.setUserProfile(response.data)
            props.setIsLoading(false)
        }

        fetchUserProfile()
    }, [])

    if (Object.keys(props.userProfile).length === 0) {
        return <Loading/>
    }
    return (
        <>
            {/*<Description/>*/}
            <UserInfo userProfile={props.userProfile}/>
            <MyPosts newPostText={props.newPostText}
                     photoUser={props.userProfile.photos.small}
                     posts={props.posts}
                     addPostState={props.addPostState}
                     newTextPost={props.newTextPost}
            />
        </>);
};

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        userProfile: state.profilePage.userProfile
    }
}


export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStoreType>(mapStateToProps, {
    addPostState,
    newTextPost,
    setIsLoading,
    setUserProfile,
})(Profile);