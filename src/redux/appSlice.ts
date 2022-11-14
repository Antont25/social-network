import {api, AuthorizedUserType, UserProfileType} from "../api/api";
import {AppThunk} from "./store";
import axios, {AxiosError} from "axios";
import {errorFromStatusCodeOrApplication} from "../common/utils/error-utils";
import {updateAvatarSuccess} from "./profileSlice";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

let initialStateApp = {
  isLoading: false,
  authorizedStatus: "initialization" as StatusAuthorizedType,
  authorizedUser: {
    id: null,
    email: null,
    login: null
  } as AuthorizedUserType,
  authorizedProfileUser: {
    photos: { small: null }
  } as UserProfileType,
  serverError: null as null | string,
  captchaUrl: null as null | string,
}

const slice = createSlice({
  name: "app",
  initialState: initialStateApp,
  reducers: {
    setIsLoading: ( state, action: PayloadAction<boolean> ) => {
      state.isLoading = action.payload
    },
    setAuthorizedUser: ( state, action: PayloadAction<AuthorizedUserType> ) => {
      state.authorizedUser = action.payload
    },
    setAuthorizedStatus: ( state, action: PayloadAction<StatusAuthorizedType> ) => {
      state.authorizedStatus = action.payload
    },
    setAuthorizedProfileUser: ( state, action: PayloadAction<UserProfileType> ) => {
      state.authorizedProfileUser = action.payload
    },
    setServerError: ( state, action: PayloadAction<string | null> ) => {
      state.serverError = action.payload
    },
    setCaptchaURl: ( state, action: PayloadAction<string | null> ) => {
      state.captchaUrl = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(updateAvatarSuccess, ( state, action ) => {
      state.authorizedProfileUser.photos = action.payload
    })
  }
})
export const appSlice = slice.reducer

//action
export const {
  setIsLoading,
  setAuthorizedUser,
  setAuthorizedStatus,
  setAuthorizedProfileUser,
  setServerError,
  setCaptchaURl
} = slice.actions

//thunk
export const fetchAuthorizedData = (): AppThunk => async dispatch => {
  try {
    dispatch(setIsLoading(true))
    let res = await api.authorizedMe()
    if (res.resultCode === 0) {
      dispatch(setAuthorizedUser(res.data))
      dispatch(setAuthorizedStatus("successfully"))
      if (res.data.id) {
        let responseUser = await api.getUserProfile(res.data.id)
        dispatch(setAuthorizedProfileUser(responseUser))
      }
    } else {
      dispatch(setAuthorizedStatus("fail"))
    }
  } catch (e) {
    const error = e as Error | AxiosError
    errorFromStatusCodeOrApplication(error, dispatch)
  } finally {
    dispatch(setIsLoading(false))
  }
}
export const fetchAuthorization = ( email: string, password: string, setStatus: any, captcha: string ): AppThunk => async dispatch => {
  try {
    dispatch(setIsLoading(true))
    let res = await api.authorize(email, password, captcha)
    if (res.resultCode === 0) {
      dispatch(fetchAuthorizedData())
      dispatch(setCaptchaURl(null))
    } else if (res.resultCode === 10) {
      dispatch(fetchCaptchaURL())
    } else if (res.resultCode !== 0) {
      dispatch(setServerError(res.messages[ 0 ]))
      setStatus(res.messages[ 0 ])
    }
  } catch (e) {
    const error = e as Error | AxiosError
    errorFromStatusCodeOrApplication(error, dispatch)
  } finally {
    dispatch(setIsLoading(false))
  }
}
export const fetchLogout = (): AppThunk => async dispatch => {
  try {
    dispatch(setIsLoading(true))
    let res = await api.logout()
    if (res.resultCode === 0) {
      dispatch(fetchAuthorizedData())
    } else {
      dispatch(setServerError(res.messages[ 0 ]))
    }
  } catch (e) {
    const error = e as Error | AxiosError
    errorFromStatusCodeOrApplication(error, dispatch)
  } finally {
    dispatch(setIsLoading(false))
  }
}
const fetchCaptchaURL = (): AppThunk => async dispatch => {
  try {
    dispatch(setIsLoading(true))
    let res = await api.getCaptchaURL()
    dispatch(setCaptchaURl(res.url))
  } catch (e) {
    const error = e as Error | AxiosError
    errorFromStatusCodeOrApplication(error, dispatch)
  } finally {
    dispatch(setIsLoading(false))
  }
}

//type
export type InitialStateTypeApp = typeof initialStateApp
export type StatusAuthorizedType = "successfully" | "initialization" | "fail"
export type ActionAppReducerType =
  ReturnType<typeof setIsLoading>
  | ReturnType<typeof setAuthorizedUser>
  | ReturnType<typeof setAuthorizedStatus>
  | ReturnType<typeof setAuthorizedProfileUser>
  | ReturnType<typeof setServerError>
  | ReturnType<typeof updateAvatarSuccess>
  | ReturnType<typeof setCaptchaURl>

