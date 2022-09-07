import axios from "axios"
import {AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAIL, LOGOUT, UPDATE_USER_FILE, GET_USER_SUCCESS, GET_USER_REQUEST, GET_USER_FAIL, GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAIL, CLEAR_SEARCH} from "../constants/userConstants"



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

       const {data} = await axios.post("/user/signin", formData)

       dispatch({type:AUTH_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: AUTH_FAIL, payload: error.message})
    }
}


export const signUp = (formData) => async (dispatch) =>{
    try {
        dispatch({type:AUTH_REQUEST})

       const {data} = await axios.post("/user/signup", formData)

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


export const getUsers = (keyword) => async (dispatch) =>{
    try {

        dispatch({
            type: GET_USERS_REQUEST,
        })

        const {data} = await axios.get(`/user?keyword=${keyword}`)

        dispatch({
            type: GET_USERS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: GET_USERS_FAIL,
            payload: error.message
        })
    }
}

export const clearSearch = () => (dispatch) =>{
    try {
        dispatch({
            type: CLEAR_SEARCH
        })
    } catch (error){
        console.log(error.message)
    }
}

export const getUser = (id) => async (dispatch) =>{
    try {

        dispatch({
            type: GET_USER_REQUEST,
        })

        const {data} = await axios.get(`/user/${id}`)

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

        const {data} = await axios.patch(`/user/profilepic`, {file: file}, config)

        dispatch({
            type: UPDATE_USER_FILE,
            payload: {token, result:{...data}}
        })
        
    } catch (error) {
        console.log(error.message)
    }
}