import {createStore, combineReducers, applyMiddleware, } from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { getPostsReducer, createPostReducer, updatePostReducer } from "./reducers/postReducers"
import { currentIDReducer } from "./reducers/userReducers"

const reducer = combineReducers({
    posts: getPostsReducer,
    newPost: createPostReducer,
    updatePost: updatePostReducer,
    currentID: currentIDReducer
})

const initialState = {
    
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store