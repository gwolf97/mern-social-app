import { CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, DELETE_POST_FAIL, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, GET_POSTS_FAIL, GET_POSTS_SUCCESS, UPDATE_POST_FAIL, UPDATE_POST_REQUEST, UPDATE_POST_SUCCESS, CURRENT_ID, LIKE } from "../constants/postConstants"


export const getPostsReducer = (state = {posts: []}, action) =>{
    switch(action.type){ 
       case GET_POSTS_SUCCESS:
                const loadedPosts = action.payload

                const found = state.posts.some( ai => loadedPosts.map(x => x._id).includes(ai._id) )

                console.log(found)
                console.log(loadedPosts.map(x => x._id))
                console.log(state.posts.map(x => x._id))

                if(found) {
                    console.log("found")
                    return{
                        ...state,
                    }
                }else{
                    return {
                        ...state,
                        posts: [...state.posts, ...loadedPosts],
                    }
                }

       case GET_POSTS_FAIL:
           return action.payload
        case LIKE:
            return {
                ...state,
                posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))
            }
       default:
           return state
    }
   }

export const createPostReducer = (state = {newPost: []}, action) =>{
    switch(action.type){
       case CREATE_POST_REQUEST:
           return {loading:true, newPost:[]}
       case CREATE_POST_SUCCESS:
           return {loading: false, newPost: action.payload}
       case CREATE_POST_FAIL:
           return {loading: false, error: action.payload}
       default:
           return state
    }
   }

export const updatePostReducer = (state = {}, action) =>{
    switch(action.type){
       case UPDATE_POST_REQUEST:
           return {loading:true}
       case UPDATE_POST_SUCCESS:
           return {loading: false, updatedPost: action.payload}
       case UPDATE_POST_FAIL:
           return {loading: false, error: action.payload}
       default:
           return state
    }
   }

export const deletePostReducer = (state = {}, action) =>{
    switch(action.type){
       case DELETE_POST_REQUEST:
           return {loading: true}
       case DELETE_POST_SUCCESS:
           return {loading: false, success: true}
       case DELETE_POST_FAIL:
           return {loading: false, error: action.payload}
       default:
           return state
    }
   }

export const currentIDReducer = (state = 0, action) =>{
    switch(action.type){
        case CURRENT_ID:
            return action.payload
       default:
           return state
    }
   }