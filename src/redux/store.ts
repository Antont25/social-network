import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {addPostState, newTextPost, profileReducer, setUserProfile} from "./profileReduser";
import {addMessage, dialogsReducer, newMessageText} from "./dialogsReduser";
import {follow, setCurrentPage, setPortionsNumber, setUsers, unFollow, usersReducer} from "./usersReduser";
import {isLoadingReducer, setIsLoading} from "./isLoadingReduser";
import {headerReducer, showMenuHandler} from "./headerReduser";


const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    headerPage: headerReducer,
    loading: isLoadingReducer,
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
    | ReturnType<typeof setIsLoading>
    | ReturnType<typeof showMenuHandler>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setPortionsNumber>
    | ReturnType<typeof setUserProfile>


export type AppStoreType = ReturnType<typeof rootReducer>
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = ReturnType<typeof store.dispatch>