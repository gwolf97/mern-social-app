import axios from "axios"
import {AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAIL, LOGOUT, UPDATE_USER_FILE, GET_USER_SUCCESS, GET_USER_REQUEST, GET_USER_FAIL} from "../constants/userConstants"



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


export const getUser = (id) => async (dispatch) =>{
    try {

        dispatch({
            type: GET_USER_REQUEST,
        })

        const {data} = await axios.get(`http://localhost:5000/user/${id}`)

        dispatch({
            type: GET_USER_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: GET_USER_FAIL,
            payload: error.message
        })
    }
}

export const updateUserFile = (file) => async (dispatch) =>{
    try {

        const token = JSON.parse(localStorage.getItem("profile")).token 

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const {data} = await axios.patch(`http://localhost:5000/user/profilepic`, {file: file}, config)

        dispatch({
            type: UPDATE_USER_FILE,
            payload: {token, result:{...data}}
        })
        
    } catch (error) {
        console.log(error.message)
    }
}