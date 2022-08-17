import {AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAIL} from "../constants/userConstants"


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