import React from 'react';
import { Navbar } from '../components/Navbar';
import "../App.css"
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import { GlobalContext } from '../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';



const Login = ()=>{
    
    const {profile, setProfile  } = useContext(GlobalContext)
    const navigate = useNavigate();


    const onSuccess = (res)=>{
        const data = jwtDecode(res.credential)
        setProfile(data)
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
                <p className='signin-title'>Sign In</p>
                {profile ? (
                    <div>
                        <p>{`Hello, ${profile.given_name}`}</p>
                        <button onClick={logout}>Logout</button>
                    </div>
                    
                ):(
                    <div className='signin-options'>
                        <div className='google-signin'>
                            <p>Sign in with Google</p>
                            <GoogleLogin onSuccess={onSuccess} onError={onError}/>
                        </div>
                        <div className='custom-signin'>
                            <p>Sign in</p>
                            <input type="email" id="signinEmail" placeholder="Email" required/>
                            <input type="password" id="signinPassword" placeholder="Password" required/>
                            <button type="submit">Sign In</button>
                        </div>
                        <div className='custom-signup'>
                            <p>Create an Account</p>
                            <input type="email" id="signupEmail" placeholder="Email" required/>
                            <input type="text" id="signinUsername" placeholder="Username" required/>
                            <input type="password" id="signupPassword" placeholder="Password" required/>
                            <button type="submit">Sign In</button>
                        </div>
                        
                    </div>

                )}
            </div>
        </div>
        
    )

}





export default Login