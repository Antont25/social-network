import React, {useEffect} from 'react';
import {MyPosts} from "../components/profile/myPosts/MyPosts";
import {connect} from "react-redux";
import {AppStoreType,} from "../redux/store";
import UserInfo from "../components/profile/userInfo/UserInfo";
import {Loading} from "../components/common/loading/Loading";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import {
    addPost,
    fetchStatusUpdates,
    fetchUserProfileData,
    PostsType,
    UserProfileType
} from "../redux/profileReducer";
import {AuthorizedUserType, StatusAuthorizedType} from "../redux/authorizedReducer";

type MapStateToPropsType = {
    posts: Array<PostsType>
    userProfile: UserProfileType
    authorizedStatus: StatusAuthorizedType
    authorizedUser: AuthorizedUserType
    isLoading: boolean
    userStatus: null | string
}
type MapDispatchToPropsType = {
    addPost: (value: string) => void
    fetchUserProfileData: (paramsURL: number) => void
    fetchStatusUpdates: (newStatus: string, userId: number) => void
}

type ProfileType = MapStateToPropsType & MapDispatchToPropsType

const Profile = (props: ProfileType) => {

    let params = useParams<'*'>()
    let paramsURL = Number(params['*'])
    const navigate = useNavigate()
    useEffect(() => {
        if (props.authorizedStatus === 'successfully' && !params['*']) {
            if (props.authorizedUser.id) paramsURL = props.authorizedUser.id
        }
        if (props.authorizedStatus === 'successfully' || paramsURL) {
            props.fetchUserProfileData(paramsURL)
        } else if (props.authorizedStatus === 'fail') {
            navigate('/login')
        }

    }, [props.authorizedStatus, paramsURL])

    if (Object.keys(props.userProfile).length === 0) {
        return <Loading/>
    }
    return (
        <>
            <UserInfo userProfile={props.userProfile}
                      authorizedUserId={props.authorizedUser.id}
                      fetchStatusUpdates={props.fetchStatusUpdates}
                      userStatus={props.userStatus}/>
            <MyPosts photoUser={props.userProfile.photos.small}
                     posts={props.posts}
                     addPost={props.addPost}
            />
        </>);
};

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        userProfile: state.profilePage.userProfile,
        authorizedStatus: state.authorized.authorizedStatus,
        authorizedUser: state.authorized.authorizedUser,
        isLoading: state.authorized.isLoading,
        userStatus: state.profilePage.userStatus,
    }
}


export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStoreType>(mapStateToProps, {
    addPost,
    fetchUserProfileData,
    fetchStatusUpdates
})(Profile);