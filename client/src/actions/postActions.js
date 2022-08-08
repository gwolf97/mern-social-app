import axios from "axios"
import { CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, GET_POSTS_FAIL, GET_POSTS_REQUEST, GET_POSTS_SUCCESS } from "../constants/postConstants"


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

        console.log(data)

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