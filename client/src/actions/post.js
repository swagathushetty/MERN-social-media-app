import axios from 'axios'
import {setAlert} from './alert'
import {GET_POSTS,POST_ERROR,UPDATE_LIKES,DELETE_POST,ADD_POST,GET_POST,ADD_COMMENT,REMOVE_COMMENT,USER_LOADED} from './types'

//get posts
export const getPosts=()=>async dispatch=>{
    try {
        const res=await axios.get('/api/posts')

        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
        
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            //status is the http status
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }

}  

//add like
export const addLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: {id,likes:res.data}
        })

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            //status is the http status
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }

}  


//remove like
export const removeLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        })

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            //status is the http status
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }

}  


//delete post
export const deletePost = (id) => async dispatch => {
    try {
         await axios.delete(`/api/posts/${id}`)

        dispatch({
            type: DELETE_POST,
            payload:id
        })
        dispatch(setAlert('post removed','success'))

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            //status is the http status
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }

}  

//add post
export const addPost = (formData) => async dispatch => {
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/posts`,formData,config)

        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        dispatch(setAlert('post created', 'success'))

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            //status is the http status
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }

}  


//get post
export const getPost = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`)


        dispatch({
            type: GET_POST,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            //status is the http status
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }

}  


//add comment
export const addComment = (postId,formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config)

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
        dispatch(setAlert('Comment added', 'success'))

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            //status is the http status
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }

}  

//delete comment
export const deleteComment = (postId,commentId) => async dispatch => {
   
    try {
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
        
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        })
        dispatch(setAlert('Comment removed', 'success'))

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            //status is the http status
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }

}  
