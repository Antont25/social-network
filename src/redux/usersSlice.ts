import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { setIsLoading, setServerError } from './appSlice';
import { AppThunk } from './store';

import { profileApi } from 'api/profileApi';
import { userApi } from 'api/userApi';
import { FetchUserType, UserType } from 'type';
import { errorFromStatusCodeOrApplication } from 'utils/error-utils';

const initialStateUserPage = {
  items: [] as Array<UserType>,
  totalCount: 0,
  pageSize: 10,
  currentPage: 1,
  portionsNumber: 1,
  error: null,
  userSubscription: [] as Array<number>,
};

const slice = createSlice({
  name: 'users',
  initialState: initialStateUserPage,
  reducers: {
    setUsers: (state, action: PayloadAction<FetchUserType>) => {
      state.items = action.payload.items;
      state.totalCount = action.payload.totalCount;
      state.error = action.payload.error;
    },
    follow: (state, action: PayloadAction<number>) => {
      state.items = state.items.map(item =>
        item.id === action.payload ? { ...item, followed: true } : item,
      );
    },
    unFollow: (state, action: PayloadAction<number>) => {
      state.items = state.items.map(item =>
        item.id === action.payload ? { ...item, followed: false } : item,
      );
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPortionsNumber: (state, action: PayloadAction<number>) => {
      state.portionsNumber = action.payload;
    },
    setUserSubscription: (
      state,
      action: PayloadAction<{ userId: number; isFollowing: boolean }>,
    ) => {
      state.userSubscription = action.payload.isFollowing
        ? [...state.userSubscription, action.payload.userId]
        : state.userSubscription.filter(item => item !== action.payload.userId);
    },
  },
});

export const usersSlice = slice.reducer;

// action
export const {
  setUsers,
  follow,
  unFollow,
  setCurrentPage,
  setPortionsNumber,
  setUserSubscription,
} = slice.actions;

// thunk
export const fetchUserData =
  (currentPage: number, searchName?: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setIsLoading(true));
      const response = await userApi.getUser(currentPage, searchName);

      dispatch(setUsers(response));
    } catch (e) {
      const error = e as Error | AxiosError;

      errorFromStatusCodeOrApplication(error, dispatch);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
export const fetchFollowUser =
  (userId: number): AppThunk =>
  async dispatch => {
    try {
      dispatch(setUserSubscription({ userId, isFollowing: true }));
      const res = await profileApi.followUser(userId);

      if (res.resultCode === 0) {
        dispatch(follow(userId));
      } else {
        dispatch(setServerError(res.messages[0]));
      }
    } catch (e) {
      const error = e as Error | AxiosError;

      errorFromStatusCodeOrApplication(error, dispatch);
    } finally {
      dispatch(setUserSubscription({ userId, isFollowing: false }));
    }
  };
export const fetchUnFollowUser =
  (userId: number): AppThunk =>
  async dispatch => {
    try {
      dispatch(setUserSubscription({ userId, isFollowing: true }));
      const res = await profileApi.unFollowUser(userId);

      if (res.resultCode === 0) {
        dispatch(unFollow(userId));
      } else {
        dispatch(setServerError(res.messages[0]));
      }
    } catch (e) {
      const error = e as Error | AxiosError;

      errorFromStatusCodeOrApplication(error, dispatch);
    } finally {
      dispatch(setUserSubscription({ userId, isFollowing: false }));
    }
  };

// type
export type InitialStateUserPageType = {
  items: Array<UserType>;
  totalCount: number;
  pageSize: number;
  currentPage: number;
  error: null;
  portionsNumber: number;
  userSubscription: Array<number>;
};
export type ActionUserReducerType =
  | ReturnType<typeof setUsers>
  | ReturnType<typeof follow>
  | ReturnType<typeof unFollow>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof setPortionsNumber>
  | ReturnType<typeof setUserSubscription>;
