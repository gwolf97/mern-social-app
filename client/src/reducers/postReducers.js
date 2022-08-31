import { CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, DELETE_POST_FAIL, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, GET_POSTS_FAIL, GET_POSTS_SUCCESS, UPDATE_POST_FAIL, UPDATE_POST_REQUEST, UPDATE_POST_SUCCESS, CURRENT_ID, GET_ADDED, GET_REMOVED, LIKE, CLEAR_POSTS, LOAD_MORE_POSTS_REQUEST, LOAD_MORE_POSTS_SUCCESS, LOAD_MORE_POSTS_FAIL, SET_SKIP } from "../constants/postConstants"


export const getPostsReducer = (state = {posts: []}, action) =>{
    switch(action.type){ 
       case GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: [...action.payload]
            }
       case GET_POSTS_FAIL:
           return action.payload
        case CREATE_POST_SUCCESS:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
            }
        case CLEAR_POSTS:
            return {
                ...state,
                posts: []
            }
        case LOAD_MORE_POSTS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case LOAD_MORE_POSTS_SUCCESS:
            {
            const loadedPosts = action.payload

            const found = state.posts.some( ai => loadedPosts.map(x => x._id).includes(ai._id) )

            if(found) {
                console.log("found")
                return{
                    ...state,
                    loading: false,
                    posts: state.posts.map(x => x._id === loadedPosts.filter(y => y._id === x._id)[0]._id ? loadedPosts.filter(y => y._id === x._id)[0] : x)
                }
            }else{
                return {
                    ...state,
                    posts: [...state.posts, ...loadedPosts],
                }
            }
        }
        case LOAD_MORE_POSTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
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
export const skipReducer = (state = 3, action) =>{
    switch(action.type){
        case SET_SKIP:
            return action.payload
        default:
            return state
    }
}