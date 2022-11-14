import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit"
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {ActionProfileReducerType, profileSlice} from "./profileSlice";
import {ActionHeaderReducerType, headerReducer} from "./headerReducer";
import {ActionAppReducerType, appSlice} from "./appSlice";
import {ActionDialogsReducerType, dialogsReducer} from "./dialogsReducer";
import {ActionUserReducerType, usersSlice} from "./usersSlice";


let rootReducer = combineReducers({
  profilePage: profileSlice,
  dialogsPage: dialogsReducer,
  usersPage: usersSlice,
  headerPage: headerReducer,
  app: appSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

//type
export type ActionType =
  ActionProfileReducerType
  | ActionHeaderReducerType
  | ActionAppReducerType
  | ActionDialogsReducerType
  | ActionUserReducerType

export type AppStoreType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch

export type AppDispatch = ThunkDispatch<AppStoreType, unknown, ActionType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStoreType, unknown, ActionType>
