import {createStore, combineReducers, applyMiddleware, } from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { getPostsReducer, createPostReducer, updatePostReducer, deletePostReducer, currentIDReducer, likeReducer } from "./reducers/postReducers"
import { authReducer } from "./reducers/userReducers"

const reducer = combineReducers({
    posts: getPostsReducer,
    newPost: createPostReducer,
    updatePost: updatePostReducer,
    deletePost: deletePostReducer,
    likePost: likeReducer,
    currentID: currentIDReducer,
    auth: authReducer,
})

const initialState = {
    
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store