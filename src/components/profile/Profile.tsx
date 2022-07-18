import React, {useEffect} from 'react';
import {MyPosts} from "./myPosts/MyPosts";
import Paper from '@material-ui/core/Paper';


import {connect} from "react-redux";
import {AppStoreType,} from "../../redux/store";
import {addPostState, newTextPost, PostsType, setUserProfile, UserProfileType} from "../../redux/profileReduser";
import {Dispatch} from "redux";
import axios from "axios";
import {InitialStateUserPageType} from "../../redux/usersReduser";
import {AuthorizedUserType, setIsLoading} from "../../redux/authorizedReduser";
import {Description} from "./descripton/Description";
import UserInfo from "./userInfo/UserInfo";
import {Loading} from "../../common/loading/Loading";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import {api} from "../../api/api";

type MapStateToPropsType = {
    posts: Array<PostsType>
    newPostText: string
    userProfile: UserProfileType
    authorized: number | null
    authorizedUser: AuthorizedUserType
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
    let paramsURL = Number(params['*'])
    const navigate = useNavigate()
    useEffect(() => {
        if (!props.authorized && params['*'] === '') {
            if (props.authorizedUser.id) paramsURL = props.authorizedUser.id
        }

        async function fetchUserProfile() {
            try {
                props.setIsLoading(true)
                if (paramsURL) {
                    let response = await api.getUserProfile(paramsURL)
                    props.setUserProfile(response)
                    props.setIsLoading(false)
                }
            } catch (er) {
                console.log(er)

            }
        }

        if (props.authorized === 0 || paramsURL) {
            fetchUserProfile()
        } else if (props.authorized === 1) {
            navigate('/login')
        }

    }, [props.authorized, paramsURL])

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
        authorized: state.authorized.authorized,
        authorizedUser: state.authorized.authorizedUser,
    }
}


export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStoreType>(mapStateToProps, {
    addPostState,
    newTextPost,
    setIsLoading,
    setUserProfile,
})(Profile);