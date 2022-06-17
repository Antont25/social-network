import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {addPostState, newTextPost, profileReduser} from "./profileReduser";
import {addMessage, dialogsReduser, newMessageText} from "./dialogsReduser";
import {follow, setUsers, unFollow, usersReduser} from "./usersReduser";
import {isLoading, isLoadingReduser} from "./isLoadingReduser";
import {headerReduser, screenWidthHandler, showMenuHandler} from "./headerReduser";


const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


let rootReducer = combineReducers({
    postPage: profileReduser,
    dialogsPage: dialogsReduser,
    usersPage: usersReduser,
    headerPage: headerReduser,
    loading: isLoadingReduser,
});
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export type ActionType =
    ReturnType<typeof addPostState>
    | ReturnType<typeof newTextPost>
    | ReturnType<typeof newMessageText>
    | ReturnType<typeof addMessage>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof follow>
    | ReturnType<typeof unFollow>
    | ReturnType<typeof isLoading>
    | ReturnType<typeof showMenuHandler>
    | ReturnType<typeof screenWidthHandler>


export type AppStoreType = ReturnType<typeof rootReducer>
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = ReturnType<typeof store.dispatch>