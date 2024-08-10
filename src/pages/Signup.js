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
                            <input type="email" id="signup-email" placeholder="Email" required/>
                            <input type="text" id="signup-username" placeholder="Username" required/>
                            <input type="text" id="signup-firstname" placeholder="First Name" required/>
                            <input type="text" id="signup-lastname" placeholder="Last Name" required/>

                            <input type="password" id="signup-password" placeholder="Password" required/>
                            <button id="signup-button" type="submit">Sign Up</button>
                        </div>
                        
                    </div>

               
            </div>
        </div>
        
    )

}





export default Signup