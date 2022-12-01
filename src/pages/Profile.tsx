import React, { ReactElement, useEffect } from 'react';

import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { Loading } from 'common/components/Loading';
import { MyPosts } from 'components/Profile/MyPosts';
import { UserInfo } from 'components/Profile/UserInfo';
import { useAppDispatch, useAppSelector } from 'hooks';
import { fetchUserProfileData } from 'redux/profileSlice';
import {
  getAuthorizedStatus,
  getAuthorizedUser,
  getIsLoading,
  getPosts,
  getUserProfile,
  getUserStatus,
} from 'selectors';

export const Profile = (): ReactElement => {
  const params = useParams<'id'>();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const authorizedStatus = useAppSelector(getAuthorizedStatus);
  const authorizedUser = useAppSelector(getAuthorizedUser);
  const isLoading = useAppSelector(getIsLoading);
  const posts = useAppSelector(getPosts);
  const userProfile = useAppSelector(getUserProfile);
  const userStatus = useAppSelector(getUserStatus);

  let paramsURL = Number(params.id);

  useEffect(() => {
    if (authorizedStatus === 'successfully' && !params.id) {
      if (authorizedUser.id) paramsURL = authorizedUser.id;
    }
    if (authorizedStatus === 'successfully' || paramsURL) {
      dispatch(fetchUserProfileData(paramsURL));
    } else if (authorizedStatus === 'fail') {
      navigate('/Login');
    }
  }, [authorizedStatus, paramsURL]);

  if (Object.keys(userProfile).length === 0 || isLoading) {
    return <Loading />;
  }

  return (
    <>
      <UserInfo
        userProfile={userProfile}
        authorizedUserId={authorizedUser.id}
        userStatus={userStatus}
      />
      <MyPosts photoUser={userProfile.photos.small} posts={posts} />
    </>
  );
};
