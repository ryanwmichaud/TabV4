import React from 'react'
import { Navbar } from '../components/Navbar'
import "../App.css"
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import {jwtDecode} from 'jwt-decode'
import { GlobalContext, getProfile} from '../App'
import { useContext, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'


const ip = process.env.REACT_APP_IP



const Login = ()=>{

    const changeEmail =(e) =>{
        setEmail(e.target.value)
    }
    const changePassword =(e) =>{
        setPassword(e.target.value)
    }
    
    const {profile, setProfile  } = useContext(GlobalContext)
    const navigate = useNavigate()
    const [email,setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [loginFailed, setLoginFailed] = useState(null)

    const createAccountFromGoogle = async (req)=>{
        fetch(`http://${ip}:8000/create-account-from-google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req),
            })
            .then(response => {
                if (!response.ok) { 
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then(data => {
                console.log(data)
                if(!data.duplicate){ 
                    setProfile(req)
                    navigate('/')
                }
            })
            .catch(error => {
            console.error(error.message)
            }) 
    }



    const lookupEmail = (req)=>{
        fetch(`http://${ip}:8000/lookup-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req),
            })
            .then(response => {
                if (!response.ok) { 
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then(data => {
                console.log(data)
                
            })
            .catch(error => {
            console.error(error.message)
            }) 
    }




    const onGoogleSuccess = (res)=>{
        const data = jwtDecode(res.credential)

        //check if google email already used
        //if already used, set profile from db and credential
        //if not, make account - ask for a username


        const req = {
            email: data.email,
            first_name: data.given_name,
            last_name: data.family_name,
            password: "google-auth",
            picture: data.picture
        }

        lookupEmail({email: data.email})
        createAccountFromGoogle(req)


    }



    const customSignin = async ()=> {
        const req = {
            email: email,
            password: password
        }

        try{
            const response = await fetch(`http://${ip}:8000/custom-signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req),
            })
            if (!response.ok) { 
                throw new Error('network response not ok')
            }
            const data = await response.json()
            if(!data.success){
                setLoginFailed(true)
            }else{
                try{
                    const profileData = await getProfile(email)
                    console.log(profileData)
                    setProfile(profileData.profile)
                    navigate('/')
                } catch (error){
                        console.error("error during fetch profile", error)
                }
            }
                
        }catch (error) {
            console.error("fetch error auth",error.message)
        }
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
                    <div>
                        <div id='signin-options'>
                            <div className='google-signin'>
                                <p id='google-signin-title'>Sign in with Google</p>
                                <GoogleLogin onSuccess={onGoogleSuccess} onError={onError}/>
                            </div>
                            <div id='custom-signin'>
                                <p id='custom-signin-title'>Sign in</p>
                                <input type="email" id="signin-email" placeholder="Email" required onChange={changeEmail}/>
                                <input type="password" id="signin-password" placeholder="Password" required onChange={changePassword}/>
                                <button id="signup-button" type="submit"  onClick={customSignin}>Sign In</button>
                            </div>
                            <div id='login-signup'>
                                <Link id='login-signup-link' to={"/signup"}> Create an Account </Link>
                            </div>
                        </div>
                        {loginFailed &&
                            <div> 
                                <p>{`Incorrect Password`}</p>
                            </div>
                        }
                    </div>

                )}
            </div>
        </div>
        
    )

}





export default Login