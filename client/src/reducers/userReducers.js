import {AUTH_FAIL, AUTH_REQUEST, AUTH_SUCCESS, CLEAR_SEARCH, GET_USER, GET_USERS_FAIL, GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USER_FAIL, GET_USER_REQUEST, GET_USER_SUCCESS, LOGOUT, UPDATE_USER_FILE} from "../constants/userConstants"

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

export const profileReducer = (state = {profile: {file:"", name:"", _id:""}}, action) => {
    switch (action.type){
        case GET_USER_REQUEST:
            return {loading: true, profile: {...state.profile}}
        case GET_USER_SUCCESS:
            return {loading: false, profile: action.payload}
        case GET_USER_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}

export const searchReducer = (state = {users: []}, action) => {
    switch (action.type){
        case GET_USERS_REQUEST:
            return {loading:true, users: []}
        case GET_USERS_SUCCESS:
            return {loading: false, users: action.payload}
        case GET_USERS_FAIL:
            return {loading: false, error: action.payload}
        case CLEAR_SEARCH :
            return {users: []}
        default:
            return state
    }
}