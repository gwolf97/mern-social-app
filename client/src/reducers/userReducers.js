import {AUTH_FAIL, AUTH_REQUEST, AUTH_SUCCESS, LOGOUT_FAIL, LOGOUT_REQUEST, LOGOUT_SUCCESS} from "../constants/userConstants"

export const authReducer = (state = {authData: null}, action) => {
    switch (action.type){
        case AUTH_REQUEST:
            return {loading: true, ...state}
        case AUTH_SUCCESS:
            localStorage.setItem('profile', JSON.stringify({...action.payload}))
            return {loading:false, ...state, authData: action.payload}
        case AUTH_FAIL:
            return {loading:false, error: action.payload}
        default:
            return state
    }
}