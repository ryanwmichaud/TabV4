import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { useEffect } from 'react';

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    useEffect(()=>{   //runs once when rendered. google will be defined when script runs in public/index.html before loading  
        /*global google*/
        google.accounts.id.initialize({
          client_id: "308435068693-g84mg566ut43fg1k48guf2q2rod2bg3o.apps.googleusercontent.com",
          callback: handleCallbackResponse,
          
        })

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "large"}
        )

        google.accounts.id.prompt(); // also display the One Tap dialog
      },[])

    function handleSubmit(event){
        event.preventDefault();
        fetch(`http://${process.env.REACT_APP_IP}:8000/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email, password: password}),
        }).then(response => {
            if (!response.ok) { 
              throw new Error('Network response was not ok');
            }
            //console.log(response)
            return response.json();
          })
          .then(data => {
            // log data
            //console.log(data)
          })
          .catch(error => {
            // log error
            console.log(error)
          });
    }

    function handleCallbackResponse(response){
        console.log("Encoded JWT ID token: " + response.credential)
    }


    

    return(
    <div>
        <Navbar></Navbar>
        <div id="signInDiv"></div>
        <form onSubmit={handleSubmit}>

            
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Enter Email" id="email" name="email"  onChange={e => setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Enter Password" id="password" name="password"  onChange={e => setPassword(e.target.value)}/>
            </div>
            <button>Login</button>
        </form>
    </div>
    )

}

export default Login;
