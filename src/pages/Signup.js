import React from 'react'
import { Navbar } from '../components/Navbar'
import "../App.css"
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext, getProfile} from '../App'





const Signup = ()=>{

    const { setProfile} = useContext(GlobalContext)


    
    const navigate = useNavigate()

    const [email, setEmail] = useState(null)
    const [username, setUsername] = useState(null)
    const [first_name, setFirstName] = useState(null)
    const [last_name, setLastName] = useState(null)
    const [password, setPassword] = useState(null)

    const [usernameTaken, setUsernameTaken] = useState(false)
    const [emailTaken, setEmailTaken] = useState(false)


    const changeEmail = (e)=>{
        setEmail(e.target.value)
    }
    const changeUsername = (e)=>{
        setUsername(e.target.value)
    }
    const changeFirstName = (e)=>{
        setFirstName(e.target.value)
    }
    const changeLastName = (e)=>{
        setLastName(e.target.value)
    }
    const changePassword = (e)=>{
        setPassword(e.target.value)
    }



    const handlePostReq = async (e) => { 
        e.preventDefault()
    
        const req = {
            email: email,
            username: username,
            first_name: first_name,
            last_name: last_name,
            password: password
        }

        const ip = process.env.REACT_APP_IP

        try{
            const response = await fetch(`http://${ip}:8000/create-account`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req),
            })
            if (!response.ok) { 
                throw new Error('Network response was not ok')
            }
            const data = await response.json()
            console.log(data)
            
            if(!data.usernameTaken && !data.emailTaken){  //if not taken,  made a profile and returned a token. store it
          
                const profileData = await getProfile(data.token)
                localStorage.setItem('token', data.token)

                console.log("getting profile on signup", profileData)
                setProfile(profileData.profile)
                setEmailTaken(false)
                setUsernameTaken(false)
                navigate('/')
            }else {
                //taken, didnt make a profile, prompt for change
                (data.usernameTaken ? setUsernameTaken(true) : setUsername(false))
                (data.emailTaken ? setEmailTaken(true) : setEmailTaken(false))
    
            }

        }catch{

        }

        
       
           
                
            
          
    }
        
      
    
    

    return(
        
        <div>
            <Navbar></Navbar>
            <div id='signup-main'>
                <p id='signup-title'>Sign Up</p>
                
                    <div >
                        
                        <form id='custom-signup' onSubmit={handlePostReq}>
                            <p>Create an Account</p>
                            <input type="email" id="signup-email" placeholder="Email" required onChange={(changeEmail)}/>
                            <input type="text" id="signup-username" placeholder="Username" required onChange={changeUsername}/>
                            <input type="text" id="signup-firstname" placeholder="First Name" required onChange={changeFirstName}/>
                            <input type="text" id="signup-lastname" placeholder="Last Name" onChange={changeLastName}required/>
                            <input type="password" id="signup-password" placeholder="Password" onChange={changePassword} required/>
                            <button id="signup-button"  type='submit' >Sign Up</button>
                        </form>
                        {(usernameTaken || emailTaken ) &&
                            <div  id='signup-error'>
                                {usernameTaken && <p>Username taken</p>}
                                {emailTaken && <p>Email already registered</p>}
                            </div>
                        }
                        
                        
                    </div>

               
            </div>
        </div>
        
    )

}





export default Signup