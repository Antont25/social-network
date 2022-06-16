import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {addPostState, newTextPost, profileReduser} from "./profileReduser";
import {addMessage, dialogsReduser, newMessageText} from "./dialogsReduser";
import {follow, setUsers, unFollow, usersReduser} from "./usersReduser";


const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


let rootReducer = combineReducers({
    postPage: profileReduser,
    dialogsPage: dialogsReduser,
    usersPage: usersReduser
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


export type AppStoreType = ReturnType<typeof rootReducer>
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = ReturnType<typeof store.dispatch>