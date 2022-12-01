import { StatusAuthorizedType } from 'redux/appSlice';
import { DialogsType } from 'redux/dialogsReducer';
import { PostsType } from 'redux/profileSlice';
import { AppStoreType } from 'redux/store';
import {
  AuthorizedUserType,
  ContactsType,
  MessageType,
  Nullable,
  UserProfileType,
  UserType,
} from 'type';

export const getAuthorizedStatus = (state: AppStoreType): StatusAuthorizedType =>
  state.app.authorizedStatus;

export const getAuthorizedUser = (state: AppStoreType): AuthorizedUserType =>
  state.app.authorizedUser;

export const getServerError = (state: AppStoreType): string => state.app.authorizedStatus;

export const getPhotosSmall = (state: AppStoreType): Nullable<string> =>
  state.app.authorizedProfileUser.photos.small;

export const getMenuIsShow = (state: AppStoreType): boolean =>
  state.headerPage.menuIsShow;

export const getCaptchaUrl = (state: AppStoreType): Nullable<string> =>
  state.app.captchaUrl;

export const getContacts = (state: AppStoreType): ContactsType =>
  state.profilePage.userProfile.contacts;

export const getDialogs = (state: AppStoreType): DialogsType[] =>
  state.dialogsPage.dialogs;

export const getMessages = (state: AppStoreType): MessageType[] =>
  state.dialogsPage.messages;

export const getIsLoading = (state: AppStoreType): boolean => state.app.isLoading;

export const getPosts = (state: AppStoreType): PostsType[] => state.profilePage.posts;

export const getUserProfile = (state: AppStoreType): UserProfileType =>
  state.profilePage.userProfile;

export const getUserStatus = (state: AppStoreType): Nullable<string> =>
  state.profilePage.userStatus;

export const getUsers = (state: AppStoreType): UserType[] => state.usersPage.items;

export const getTotalCount = (state: AppStoreType): number => state.usersPage.totalCount;

export const getPageSize = (state: AppStoreType): number => state.usersPage.pageSize;

export const getCurrentPage = (state: AppStoreType): number =>
  state.usersPage.currentPage;

export const getPortionsNumber = (state: AppStoreType): number =>
  state.usersPage.portionsNumber;

export const getUserSubscription = (state: AppStoreType): number[] =>
  state.usersPage.userSubscription;
