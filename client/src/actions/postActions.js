import axios from "axios"
import { GET_POSTS_FAIL, GET_POSTS_REQUEST, GET_POSTS_SUCCESS } from "../constants/postConstants"


export const getPosts = () => async (dispatch) =>{
    try {
        dispatch({type: GET_POSTS_REQUEST})

        const {data} = await axios.get("http://localhost:5000/posts")

        console.log(data)

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