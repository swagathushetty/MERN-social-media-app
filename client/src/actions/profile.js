import axios from 'axios'
import {setAlert} from './alert';
import {GET_PROFILE,PROFILE_ERROR,UPDATE_PROFILE, CLEAR_PROFILE,ACCOUNT_DELETED,GET_PROFILES,GET_REPOS} from './types'
import { set } from 'mongoose';
import { setAuthToken } from '../utils/setAuthToken';


//get current users profile
export const getCurrentProfile=()=>async dispatch=>{
    try {
        const res=await axios.get('/api/profile/me')

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            //status is the http status
            payload:{msg:error.response.data.msg,status:error.response.status}
        })
        
    }
}

//get all profiles
export const getProfiles = () => async dispatch => {
    
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await axios.get('/api/profile')

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            //status is the http status
            payload: { msg: error.response.data.msg, status: error.response.status }
        })

    }
}


//get profile by id
export const getProfileById = (userId) => async dispatch => {

    
    try {
        const res = await axios.get(`/api/profile/user/${userId}`)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            //status is the http status
            payload: { msg: error.response.data.msg, status: error.response.status }
        })

    }
}

//get github repos
export const getGithubRepos = (username) => async dispatch => {


    try {
        const res = await axios.get(`/api/profile/github/${username}`)

        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            //status is the http status
            payload: { msg: error.response.data.msg, status: error.response.status }
        })

    }
}


//create or update profile
export const createProfile=(formData,history,edit=false)=>async dispatch=>{
    try {
        const config={
            'Content-Type':'application/json'
        }
        const res=await axios.post('/api/profile',formData,config)
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        dispatch(setAlert(edit?'profile updated':'profile created'))

        if(!edit){
            history.push('/dashboard')
        }
        
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        }
        dispatch({
            type: PROFILE_ERROR,
            //status is the http status
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }
}

//ADD EXPERIENCE
export const addExperience=(formData,history)=>async dispatch=>{
    try {
        const config = {
            'Content-Type': 'application/json'
        }
        const res = await axios.put('/api/profile/experience', formData, config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('experience added','sucess'))

        history.push('/dashboard');

        
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        }
        dispatch({
            type: PROFILE_ERROR,
            //status is the http status
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }
}

//ADD Education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            'Content-Type': 'application/json'
        }
        const res = await axios.put('/api/profile/education', formData, config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('education added', 'success'))

        history.push('/dashboard');

        

    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach((error) => {
                dispatch(setAlert(error.msg, 'danger'))
            })
        }
        dispatch({
            type: PROFILE_ERROR,
            //status is the http status
            payload: { msg: error.response.data.msg, status: error.response.status }
        })
    }
}

//delete experience
export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Removed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//delete education
export const deleteEducation = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Education removed', 'success'))

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//delete account and profile
export const deleteAccount = () => async dispatch => {
   
    if(window.confirm('are you sure? this cannot be undone')){
        try {
            await axios.delete(`/api/profile`)

            dispatch({
                type: CLEAR_PROFILE
            })
            dispatch({
                type: ACCOUNT_DELETED
            })


            dispatch(setAlert('your account has been permenantely deleted'))

        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status }
            })
        }
    }
    
}