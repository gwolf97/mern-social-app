import axios from "axios"
import { CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CURRENT_ID, DELETE_POST_FAIL, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, GET_POSTS_FAIL, GET_POSTS_SUCCESS, UPDATE_POST_FAIL, UPDATE_POST_REQUEST, UPDATE_POST_SUCCESS, LIKE, GET_ADDED, LOAD_MORE_POSTS_FAIL, LOAD_MORE_POSTS_SUCCESS, LOAD_MORE_POSTS_REQUEST, CLEAR_POSTS, SET_SKIP, CREATE_COMMENT, DELETE_COMMENT } from "../constants/postConstants"



export const getPosts = () => async (dispatch) =>{
    try {
        dispatch({
            type: CLEAR_POSTS
        })

        const {data} = await axios.get("https://wolf-mern-social-app.herokuapp.com/posts",  {params: 0})

        dispatch({
            type: GET_POSTS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: GET_POSTS_FAIL,
            payload: error.message
        })
    }
}

export const loadMore = (skip) => async (dispatch) =>{
    try {

        dispatch({
            type: LOAD_MORE_POSTS_REQUEST
        })

        const {data} = await axios.get("https://wolf-mern-social-app.herokuapp.com/posts",  {params: { skip: skip } })

        dispatch({
            type: LOAD_MORE_POSTS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: LOAD_MORE_POSTS_FAIL,
            payload: error.message
        })
    }
}


export const createPost = (postData) => async (dispatch) =>{
    try {
        const token = JSON.parse(localStorage.getItem("profile")).token 

        dispatch({type: CREATE_POST_REQUEST})

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const {data} = await axios.post("https://wolf-mern-social-app.herokuapp.com/posts", postData, config)

        dispatch({
            type: CREATE_POST_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: CREATE_POST_FAIL,
            payload: error.message
        })
    }
}


export const updatePost = (currentID, postData) => async (dispatch) =>{
    try {
        const token = JSON.parse(localStorage.getItem("profile")).token 

        dispatch({type: UPDATE_POST_REQUEST})

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const {data} = await axios.patch(`https://wolf-mern-social-app.herokuapp.com/posts/${currentID}`, postData, config)

        dispatch({
            type: UPDATE_POST_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: UPDATE_POST_FAIL,
            payload: error.message
        })
    }
}


export const deletePost = (currentID) => async (dispatch) =>{
    try {
        const token = JSON.parse(localStorage.getItem("profile")).token 

        dispatch({type: DELETE_POST_REQUEST})

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        await axios.delete(`https://wolf-mern-social-app.herokuapp.com/posts/${currentID}`, config)

        dispatch({
            type: DELETE_POST_SUCCESS
        })
        
    } catch (error) {
        dispatch({
            type: DELETE_POST_FAIL,
            payload: error.message
        })
    }
}

export const likePost = (currentID) => async (dispatch) =>{
    try {

        const token = JSON.parse(localStorage.getItem("profile")).token 

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const {data} = await axios.patch(`https://wolf-mern-social-app.herokuapp.com/posts/${currentID}/like`, config)

        dispatch({
            type: LIKE,
            payload: data
        })



    } catch (error) {
        console.log(error.message)
    }
}

export const createComment = (postId, comment) => async (dispatch) =>{
    try {

        const token = JSON.parse(localStorage.getItem("profile")).token 

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const {data} = await axios.post(`https://wolf-mern-social-app.herokuapp.com/posts/${postId}/comments`, comment, config)

        dispatch({
            type: CREATE_COMMENT,
            payload: data
        })



    } catch (error) {
        console.log(error.message)
    }
}

export const deleteComment = (postId, commentId) => async (dispatch) =>{
    try {

        const token = JSON.parse(localStorage.getItem("profile")).token 

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const {data} = await axios.delete(`https://wolf-mern-social-app.herokuapp.com/posts/${postId}/${commentId}/comments`, config)

        dispatch({
            type: DELETE_COMMENT,
            payload: data
        })



    } catch (error) {
        console.log(error.message)
    }
}



export const setCurrentID = (id) => async (dispatch) =>{
    try {

        const data = id

        dispatch({
            type: CURRENT_ID,
            payload: data
        })
        
    } catch (error) {
        console.log(error.message)
    }
}

export const setSkip = (skip) => async (dispatch) =>{
    try {

        dispatch({
            type: SET_SKIP,
            payload: skip
        })
        
    } catch (error) {
        console.log(error.message)
    }
}