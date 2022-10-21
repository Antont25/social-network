import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {ActionProfileReducerType, profileReducer} from './profileReducer';
import {ActionHeaderReducerType, headerReducer} from './headerReducer';
import {ActionAppReducerType, appReducer} from './appReducer';
import {ActionDialogsReducerType, dialogsReducer} from './dialogsReducer';
import {ActionUserReducerType, usersReducer} from './usersReducer';


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    headerPage: headerReducer,
    app: appReducer,
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
