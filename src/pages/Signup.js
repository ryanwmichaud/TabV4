import React from 'react';
import { Navbar } from '../components/Navbar';
import "../App.css"

import { GlobalContext } from '../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';



const Signup = ()=>{
    
    const {profile, setProfile  } = useContext(GlobalContext)
    const navigate = useNavigate();



    return(
        <div>
            <Navbar></Navbar>
            <div id='signup-main'>
                <p id='signup-title'>Sign Up</p>
                
                    <div >
                        
                        <div id='custom-signup'>
                            <p>Create an Account</p>
                            <input type="email" id="signupEmail" placeholder="Email" required/>
                            <input type="text" id="signinUsername" placeholder="Username" required/>
                            <input type="password" id="signupPassword" placeholder="Password" required/>
                            <button type="submit">Sign In</button>
                        </div>
                        
                    </div>

               
            </div>
        </div>
        
    )

}





export default Signup