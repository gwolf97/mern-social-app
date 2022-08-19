import axios from "axios"
import { CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CURRENT_ID, DELETE_POST_FAIL, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, GET_POSTS_FAIL, GET_POSTS_REQUEST, GET_POSTS_SUCCESS, UPDATE_POST_FAIL, UPDATE_POST_REQUEST, UPDATE_POST_SUCCESS, LIKE } from "../constants/postConstants"



export const getPosts = () => async (dispatch) =>{
    try {

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
        const token = JSON.parse(localStorage.getItem("profile")).token 

        dispatch({type: CREATE_POST_REQUEST})

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const {data} = await axios.post("http://localhost:5000/posts", postData, config)

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

        const {data} = await axios.patch(`http://localhost:5000/posts/${currentID}`, postData, config)

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

        await axios.delete(`http://localhost:5000/posts/${currentID}`, config)

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

        console.log(currentID)

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const {data} = await axios.patch(`http://localhost:5000/posts/${currentID}/like`, {}, config)

        dispatch({
            type: LIKE,
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