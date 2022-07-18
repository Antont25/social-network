import React, {useEffect} from 'react';
import {MyPosts} from "./myPosts/MyPosts";
import {connect} from "react-redux";
import {AppStoreType,} from "../../redux/store";
import UserInfo from "./userInfo/UserInfo";
import {Loading} from "../../common/loading/Loading";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import {addPostState, fetchUserProfileData, newTextPost, PostsType, UserProfileType} from "../../redux/profileReducer";
import {AuthorizedUserType} from "../../redux/authorizedReducer";

type MapStateToPropsType = {
    posts: Array<PostsType>
    newPostText: string
    userProfile: UserProfileType
    authorizedCode: null | number
    authorizedUser: AuthorizedUserType
    isLoading: boolean
}
type MapDispatchToPropsType = {
    addPostState: () => void
    newTextPost: (newText: string) => void
    fetchUserProfileData: (paramsURL: number) => void
}

type ProfileType = MapStateToPropsType & MapDispatchToPropsType

const Profile = (props: ProfileType) => {

    let params = useParams<'*'>()
    let paramsURL = Number(params['*'])
    const navigate = useNavigate()
    useEffect(() => {
        if (props.authorizedCode === 0 && !params['*']) {
            if (props.authorizedUser.id) paramsURL = props.authorizedUser.id
        }


        if (props.authorizedCode === 0 || paramsURL) {
            props.fetchUserProfileData(paramsURL)
        } else if (props.authorizedCode === 1) {
            navigate('/login')
        }

    }, [props.authorizedCode, paramsURL])

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
        userProfile: state.profilePage.userProfile,
        authorizedCode: state.authorized.authorizedCode,
        authorizedUser: state.authorized.authorizedUser,
        isLoading: state.authorized.isLoading,
    }
}


export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStoreType>(mapStateToProps, {
    addPostState,
    newTextPost,
    fetchUserProfileData
})(Profile);