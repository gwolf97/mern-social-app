import {AUTH_FAIL, AUTH_REQUEST, AUTH_SUCCESS, GET_USER, LOGOUT, UPDATE_USER_FILE} from "../constants/userConstants"

export const authReducer = (state = {authData: null}, action) => {
    switch (action.type){
        case AUTH_REQUEST:
            return state = {loading: true, ...state}
        case AUTH_SUCCESS:
            localStorage.setItem('profile', JSON.stringify({...action.payload}))
            return state = {...state, success: true, loading: false, authData: action.payload}
        case AUTH_FAIL:
            return {loading:false, error: action.payload}
        case UPDATE_USER_FILE:
            localStorage.clear()
            localStorage.setItem('profile', JSON.stringify({...action.payload}))
            return state = {authData: action.payload}
        case LOGOUT:
            localStorage.clear()
            return {...state, authData: null}
        default:
            return state
    }
}

export const profileReducer = (state = {file:"", name:"", _id:""}, action) => {
    switch (action.type){
        case GET_USER:
            return action.payload
        default:
            return state
    }
}