import React from 'react';
import { Navbar } from '../components/Navbar';
import "../App.css"
import { GoogleLogin } from '@react-oauth/google';



const Login = ({isMobileView, setIsMobileView, isMobileMenuVisible, setIsMobileMenuVisible})=>{

    const handleSuccess = (response) => {
        console.log('Login Success:', response);
        // Handle the login success (e.g., send token to server)
      }
    
    const handleError = (error) => {
        console.log('Login Error:', error);
        // Handle the login error
      }

    return(
        <div>
            <Navbar></Navbar>
            <div className='login-main'>
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                />
            </div>
            
        </div>
        
    )

}





export default Login