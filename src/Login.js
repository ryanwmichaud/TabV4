import React, { useState } from "react";
import Navbar from "./components/Navbar";

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
            console.log(response)
            return response.json();
          })
          .then(data => {
            // log data
            console.log(data)
          })
          .catch(error => {
            // log error
            console.log(error)
          });
    }

    return(
    <div>
        <Navbar></Navbar>
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
