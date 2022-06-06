import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {profileReduser} from "./profileReduser";
import {dialogsReduser} from "./dialogsReduser";





const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let rootReduser  = combineReducers({
    postPage: profileReduser,
    dialogsPage: dialogsReduser
});
export const store = createStore(rootReduser, composeEnhancers(applyMiddleware(thunk)))

type RootReduserType=typeof rootReduser

export type StoreAppType=ReturnType<RootReduserType>