import { CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, GET_POSTS_FAIL, GET_POSTS_REQUEST, GET_POSTS_SUCCESS } from "../constants/postConstants"


export const getPostsReducer = (state = {posts: {}}, action) =>{
    switch(action.type){
       case GET_POSTS_REQUEST:
           return {loading: true, posts: []}
       case GET_POSTS_SUCCESS:
           return {loading: false, posts: action.payload}
       case GET_POSTS_FAIL:
           return {loading: false, error: action.payload}
       default:
           return state
    }
   }

export const createPostReducer = (state = {newPost: []}, action) =>{
    switch(action.type){
       case CREATE_POST_REQUEST:
           return {loading:true, newPost:[]}
       case CREATE_POST_SUCCESS:
           return {loading: false, newPost: action.payload}
       case CREATE_POST_FAIL:
           return {loading: false, error: action.payload}
       default:
           return state
    }
   }

export const updatePostReducer = (state = {}, action) =>{
    switch(action.type){
       case CREATE_POST_REQUEST:
           return {loading:true}
       case CREATE_POST_SUCCESS:
           return {loading: false, updatedPost: action.payload}
       case CREATE_POST_FAIL:
           return {loading: false, error: action.payload}
       default:
           return state
    }
   }