import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {ActionProfileReducerType, profileReducer} from './profileReducer';
import {ActionHeaderReducerType, headerReducer} from './headerReducer';
import {ActionAppReducerType, appReducer} from './appReducer';
import {ActionDialogsReducerType, dialogsReducer} from './dialogsReducer';
import {ActionUserReducerType, usersReducer} from './usersReducer';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    headerPage: headerReducer,
    app: appReducer,
});

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

//type
export type ActionType =
    ActionProfileReducerType
    | ActionHeaderReducerType
    | ActionAppReducerType
    | ActionDialogsReducerType
    | ActionUserReducerType

export type AppStoreType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppStoreType, unknown, ActionType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStoreType, unknown, ActionType>
