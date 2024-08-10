import React from 'react';
import { Navbar } from '../components/Navbar';
import "../App.css"
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import { GlobalContext } from '../App';
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';



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
            <div id='login-main'>
                <p className='signin-title'>Sign In</p>
                {profile ? (
                    <div>
                        <p>{`Hello, ${profile.given_name}`}</p>
                        <button onClick={logout}>Logout</button>
                    </div>
                    
                ):(
                    <div className='signin-options'>
                        <div className='google-signin'>
                            <p id='google-signin-title'>Sign in with Google</p>
                            <GoogleLogin onSuccess={onSuccess} onError={onError}/>
                        </div>
                        <div id='custom-signin'>
                            <p id='custom-signin-title'>Sign in</p>
                            <input type="email" id="signin-email" placeholder="Email" required/>
                            <input type="password" id="signin-password" placeholder="Password" required/>
                            <button id="signup-button" type="submit">Sign In</button>
                        </div>
                        <div id='login-signup'>
                            <Link id='login-signup-link' to={"/signup"}> Create an Account </Link>
                        </div>

                        
                    </div>

                )}
            </div>
        </div>
        
    )

}





export default Login