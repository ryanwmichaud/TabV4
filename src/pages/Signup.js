import React from 'react';
import { Navbar } from '../components/Navbar';
import "../App.css"
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from "../App";




const Signup = ()=>{

    const {profile, setProfile} = useContext(GlobalContext)


    
    const navigate = useNavigate();

    const [email, setEmail] = useState(null)
    const [username, setUsername] = useState(null)
    const [first_name, setFirstName] = useState(null)
    const [last_name, setLastName] = useState(null)
    const [password, setPassword] = useState(null)

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



    const handlePostReq = (e) => { 
        e.preventDefault()
    
        const req = {
            email: email,
            username: username,
            first_name: first_name,
            last_name: last_name,
            password: password,
            picture: null
        }

        const ip = process.env.REACT_APP_IP


        fetch(`http://${ip}:8000/createaccount`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers if needed
            },
            body: JSON.stringify(req),
            })
            .then(response => {
            if (!response.ok) { 
                throw new Error('Network response was not ok');
            }
            return response.json();
            })
            .then(data => {
            console.log(data)
            if(!data.duplicate){ 
                setProfile({
                    email: email,
                    username: username,
                    first_name: first_name,
                    last_name: last_name,
                    password: password,
                    picture: null

                })
                navigate('/')
            }
            else if(data.duplicate === "username"){
                console.log("username taken")
            }else if(data.duplicate === "email"){
                console.log("email already registered")
            }
            
            })
            .catch(error => {
            // Handle and store the error
            console.error(error.message)
            }) 
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
                        
                    </div>

               
            </div>
        </div>
        
    )

}





export default Signup