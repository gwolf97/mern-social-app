import axios from "axios"
import { CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, DELETE_POST_FAIL, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, GET_POSTS_FAIL, GET_POSTS_REQUEST, GET_POSTS_SUCCESS, UPDATE_POST_FAIL, UPDATE_POST_REQUEST, UPDATE_POST_SUCCESS } from "../constants/postConstants"


export const getPosts = () => async (dispatch) =>{
    try {
        dispatch({type: GET_POSTS_REQUEST})

        const {data} = await axios.get("http://localhost:5000/posts")

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


export const createPost = (postData) => async (dispatch) =>{
    try {
        dispatch({type: CREATE_POST_REQUEST})

        const {data} = await axios.post("http://localhost:5000/posts", postData)

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
        dispatch({type: UPDATE_POST_REQUEST})

        const {data} = await axios.patch(`http://localhost:5000/posts/${currentID}`, postData)

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
        dispatch({type: DELETE_POST_REQUEST})

        await axios.delete(`http://localhost:5000/posts/${currentID}`)

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