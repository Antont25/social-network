import React, {useEffect} from 'react';
import {MyPosts} from '../components/profile/myPosts/MyPosts';
import UserInfo from '../components/profile/userInfo/UserInfo';
import {Loading} from '../components/common/loading/Loading';
import {useParams} from 'react-router';
import {useNavigate} from 'react-router-dom';
import {fetchUserProfileData,} from '../redux/profileReducer';
import {useAppDispatch, useAppSelector} from '../utils/hooks/hooks';


export const Profile = () => {
    const dispatch = useAppDispatch()
    const {authorizedStatus, authorizedUser, isLoading, posts, userProfile, userStatus} = useAppSelector(state =>
        ({
            authorizedStatus: state.app.authorizedStatus,
            authorizedUser: state.app.authorizedUser,
            isLoading: state.app.isLoading,
            posts: state.profilePage.posts,
            userProfile: state.profilePage.userProfile,
            userStatus: state.profilePage.userStatus,
        }))

    let params = useParams<'id'>()
    let paramsURL = Number(params['id'])
    const navigate = useNavigate()
    useEffect(() => {
        if (authorizedStatus === 'successfully' && !params['id']) {
            if (authorizedUser.id) paramsURL = authorizedUser.id
        }
        if (authorizedStatus === 'successfully' || paramsURL) {
            dispatch(fetchUserProfileData(paramsURL))
        } else if (authorizedStatus === 'fail') {
            navigate('/login')
        }

    }, [authorizedStatus, paramsURL])

    if (Object.keys(userProfile).length === 0 || isLoading) {
        return <Loading/>
    }
    return (
        <>
            <UserInfo userProfile={userProfile}
                      authorizedUserId={authorizedUser.id}
                      userStatus={userStatus}/>
            <MyPosts photoUser={userProfile.photos.small}
                     posts={posts}
            />
        </>);
};


