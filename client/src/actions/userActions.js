import axios from "axios"
import { useNavigate } from "react-router-dom"
import {AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAIL, LOGOUT} from "../constants/userConstants"



export const auth = (response, token) => async (dispatch) =>{
    try {

        dispatch({type: AUTH_REQUEST})

        const data = {response: response, token: token}

        dispatch({
            type: AUTH_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: AUTH_FAIL,
            payload: error.message
        })
    }
}


export const signIn = (formData) => async (dispatch) =>{
    try {
        dispatch({type:AUTH_REQUEST})

       const {data} = await axios.post("http://localhost:5000/user/signin", formData)

       dispatch({type:AUTH_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: AUTH_FAIL, payload: error.message})
    }
}


export const signUp = (formData) => async (dispatch) =>{
    try {
        dispatch({type:AUTH_REQUEST})

       const {data} = await axios.post("http://localhost:5000/user/signup", formData)

       dispatch({type:AUTH_SUCCESS, payload: data})

       const navigate = useNavigate()
       navigate("/")

    } catch (error) {
        dispatch({type: AUTH_FAIL, payload: error.message})
    }
}

export const logOut = () => async (dispatch) =>{
    try {
        dispatch({type: LOGOUT})
    } catch (error) {
        console.log(error)
    }
}