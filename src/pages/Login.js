import React from 'react';
import { Navbar } from '../components/Navbar';
import "../App.css"
import { GoogleLogin } from '@react-oauth/google';




const Login = ({isMobileView, setIsMobileView, isMobileMenuVisible, setIsMobileMenuVisible})=>{


    const onSuccess = (res)=>{
        console.log(res)
    }
    const onError = (error)=>{
        console.log(error)
    }

    return(
        <div>
            <Navbar></Navbar>
            <div className='login-main'>
                login page
                <GoogleLogin onSuccess={onSuccess} onError={onError}/>
            </div>
        </div>
        
    )

}





export default Login