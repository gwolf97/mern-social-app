import { CURRENT_ID } from "../constants/userConstants";

export const setCurrentID = (id) => async (dispatch) =>{
    try {

        const data = id

        dispatch({
            type: CURRENT_ID,
            payload: data
        })
        
    } catch (error) {
        console.log(error.message)
    }
}