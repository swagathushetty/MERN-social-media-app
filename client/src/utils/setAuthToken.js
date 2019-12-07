//this file will add/remove tokens from localstorage if token exists

import axios from 'axios'

export const setAuthToken=(token)=>{
    
    //from localstorage
    if(token){
        axios.defaults.headers.common['x-auth-token']=token
    } 
    else{
        delete axios.defaults.headers.common['x-auth-token']
    }
}