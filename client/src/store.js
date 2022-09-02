import {createStore, combineReducers, applyMiddleware, } from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { getPostsReducer, createPostReducer, updatePostReducer, deletePostReducer, currentIDReducer, skipReducer } from "./reducers/postReducers"
import { authReducer } from "./reducers/userReducers"

const reducer = combineReducers({
    posts: getPostsReducer,
    newPost: createPostReducer,
    updatePost: updatePostReducer,
    deletePost: deletePostReducer,
    currentID: currentIDReducer,
    skip: skipReducer,
    auth: authReducer,
})

const initialState = {
    auth: {authData: JSON.parse(localStorage.getItem("profile"))} || {authData: null}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store