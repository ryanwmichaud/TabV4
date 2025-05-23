import React from 'react'
import { Navbar } from '../components/Navbar'
import "../App.css"
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import {jwtDecode} from 'jwt-decode'
import { GlobalContext, getProfile} from '../App'
import { useContext, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'


const ip = process.env.REACT_APP_IP
const port = process.env.REACT_APP_PORT
const urlBase = window.location.hostname === "localhost"
  ? `http://${ip}:${port}` // Local testing
  : "https://chords.ryanwmichaud.com"; // Production



const Login = ()=>{

    const changeEmail =(e) =>{
        setEmail(e.target.value)
    }
    const changePassword =(e) =>{
        setPassword(e.target.value)
    }
    
    const { setProfile  } = useContext(GlobalContext)
    const navigate = useNavigate()
    const [email,setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [loginFailed, setLoginFailed] = useState(null)



    const onGoogleSuccess = async (res)=>{
        

        //google has verified its them
        //check if googleid is in my table
        //if already used, get them a token, get  profile with it on the front end
        //if not, make account - ask for a username
        
  

        const data = jwtDecode(res.credential)
        const google_id = data.sub

        try{
            const response = await lookupGoogleId(google_id)
            //if there is already an account, log it in
            if (response.found){
                localStorage.setItem('token', response.token)
                const profileData = await getProfile(response.token)
                await setProfile(profileData.profile)
                navigate('/')
            }
            else{
                const req = {
                    email: data.email,
                    first_name: data.given_name,
                    last_name: data.family_name,
                    profile_photo: data.picture,
                    google_id: google_id,
                    username: data.email
                    //no username yet, password will be null
                }
                createAccountFromGoogle(req)
            }
            
        } 
        catch(error){
            console.error("error lookingup google id", error)
        }

        
        //createAccountFromGoogle(req)


    }


    const createAccountFromGoogle = async (req)=>{ //returns token
        const response = await fetch(`${urlBase}/create-account-from-google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req),
            })
        const data = await response.json()
        
        localStorage.setItem('token', data.token)

        const profileData = await getProfile(data.token)
        await setProfile(profileData.profile)
        navigate('/')
    
           
    }
        

    const lookupGoogleId = async (google_id)=>{
        //console.log('lookingup google id')
        try{
            
            const response = await fetch(`${urlBase}/lookup-google-id`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({google_id: google_id}),
                })

            if (!response.ok) { 
                throw new Error(`Network response was not ok:${response.statusText}`)
            }
            const data = await response.json();  // Parse the JSON response

            return data;

        }catch(error){
            console.error(error)
        }
        
        
        
    }



    const customSignin = async ()=> {
        const req = {
            email: email,
            password: password
        }

        try{
            const response = await fetch(`${urlBase}/custom-signin`, {
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
                    localStorage.setItem('token', data.token)

                    const profileData = await getProfile(data.token)
                    await setProfile(profileData.profile)
                    
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
        console.error(error)
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
                
                <div className='signin-container'>
                    <div id='signin-options'>
                        <div className='google-signin'>
                            <p id='google-signin-title'>Sign in with Google</p>
                            
                            <div id="google-signin-button-container">
                                <GoogleLogin  onSuccess={onGoogleSuccess} onError={onError}/>
                            </div>
                        </div>
                        <div id='custom-signin'>
                            <p id='custom-signin-title'>Sign in</p>
                            <input type="email" id="signin-email" placeholder="Email" required onChange={changeEmail}/>
                            <input type="password" id="signin-password" placeholder="Password" required onChange={changePassword}/>
                            <button id="signin-button" type="submit"  onClick={customSignin}>Sign In</button>
                        </div>
                        <div id='login-signup'>
                            <Link id='login-signup-link' to={"/signup"}> Create an Account </Link>
                        </div>
                    </div>
                    {loginFailed &&
                        <div> 
                            <p>{`Incorrect Email and Password`}</p>
                        </div>
                    }
                </div>

                
            </div>
        </div>
        
    )

}





export default Login