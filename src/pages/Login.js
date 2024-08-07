import React from 'react';
import { Navbar } from '../components/Navbar';
import "../App.css"


const Login = ({isMobileView, setIsMobileView, isMobileMenuVisible, setIsMobileMenuVisible})=>{

    return(
        <div>
            <Navbar></Navbar>
            <div className='login-main'>
                login page
            </div>
        </div>
        
    )

}


export default Login