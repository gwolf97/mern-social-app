import {AUTH_FAIL, AUTH_REQUEST, AUTH_SUCCESS, LOGOUT} from "../constants/userConstants"

export const authReducer = (state = {authData: null}, action) => {
    switch (action.type){
        case AUTH_REQUEST:
            return {loading: true, ...state}
        case AUTH_SUCCESS:
            localStorage.setItem('profile', JSON.stringify({...action.payload}))
            return {...state, loading: false, authData: action.payload}
        case AUTH_FAIL:
            return {loading:false, error: action.payload}
        case LOGOUT:
            localStorage.clear()
            return {...state, authData: null}
        default:
            return state
    }
}