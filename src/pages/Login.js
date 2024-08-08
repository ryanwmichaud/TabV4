import React from 'react';
import { Navbar } from '../components/Navbar';
import "../App.css"
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import { GlobalContext } from '../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';






const Login = ()=>{
    
    const {profile, setProfile,isMobileView,  setisMobileView, isMobileMenuVisible, setIsMobileMenuVisible } = useContext(GlobalContext)
    const navigate = useNavigate();


    const onSuccess = (res)=>{
        const data = jwtDecode(res.credential)
        setProfile(data)
        console.log('navigate', navigate)
        navigate('/');
    }
    const onError = (error)=>{
        console.log(error)
    }
    const logout = ()=>{
        googleLogout()
        setProfile(null)
    }

    return(
        <div>
            <Navbar></Navbar>
            <div className='login-main'>
                <p>Login Page</p>
                {profile ? (
                    <div>
                        <p>{`Hello, ${profile.given_name}`}</p>
                        <button onClick={logout}>Logout</button>
                    </div>
                    
                ):(
                    <GoogleLogin onSuccess={onSuccess} onError={onError}/>

                )}
            </div>
        </div>
        
    )

}





export default Login