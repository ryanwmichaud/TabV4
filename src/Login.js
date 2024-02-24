import React, { useState } from "react";
import Navbar from "./components/Navbar";

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    function handleSubmit(event){
        event.preventDefault();
    }

    return(
    <div>
        <Navbar></Navbar>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Email</label>
                <input type="email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="password">password</label>
                <input type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.password)}/>
            </div>
            <button>Login</button>
        </form>
    </div>
    )

}

export default Login;
