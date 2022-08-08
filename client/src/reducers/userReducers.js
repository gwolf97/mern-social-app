import { CURRENT_ID } from "../constants/userConstants";

export const currentIDReducer = (state = 0, action) =>{
    switch(action.type){
        case CURRENT_ID:
            return {state: action.payload}
       default:
           return state
    }
   }