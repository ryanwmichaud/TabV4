import React, {useContext, useEffect} from "react"
import { useNavigate } from 'react-router-dom'

import { Navbar } from '../components/Navbar'
import { GlobalContext } from "../App"
const ip = process.env.REACT_APP_IP
const port = process.env.REACT_APP_PORT



const Profile = () =>{

    const {profile}= useContext(GlobalContext)
    const navigate = useNavigate()

    useEffect(()=>{
        //console.log(profile)
        if(profile === null){
            navigate('/login')
        }
    })



    const   changeColor = async (e) => {
        let color = e.target.value
      
        document.documentElement.style.setProperty('--primary-color', `var(--${color})`)

        const req = {
            token: localStorage.getItem('token'),
            preference_key: "color", 
            preference_value: e.target.value
        }

        fetch(`http://${ip}:${port}/change-preference`, {
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

    let color = document.documentElement.style.getPropertyValue('--primary-color').trim();
    color= color.replace('var(--', '').replace(')', '').trim()
    color = color.charAt(0).toUpperCase() + color.slice(1)


    return(
        <div>
            <Navbar></Navbar>
            <div id='profile-main'>


                <div id='profile-preferences'>
                    <p>Preferences</p>
                    <p>Change Color</p>
                    <select id="color-select" defaultValue={color} onChange={changeColor}>
                        <option value={"blue"}>Blue</option>
                        <option value={"red"}>Red</option>
                        <option value={"green"}>Green</option>
                    </select>
                </div>           

            </div>

        </div>
    )

}

export {Profile}

/*
<div id='edit-profile'>
    <p>Edit Profile</p>
    <p>Change Username</p>
    <p>Change Password</p>
    <p>Change Email</p>
    <p>Change Picture</p>
</div>
 */