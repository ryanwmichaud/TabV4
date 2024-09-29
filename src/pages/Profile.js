import React, {useContext} from "react"

import { Navbar } from '../components/Navbar'
import { GlobalContext } from "../App"
const ip = process.env.REACT_APP_IP


const Profile = () =>{

    const {profile}= useContext(GlobalContext)


    const   changeColor = async (e) => {
        console.log(e.target.value)
        let color = e.target.value
      
        document.documentElement.style.setProperty('--primary-color', `var(--${color})`)

        const req = {
            token: localStorage.getItem('token'),
            preference_key: "color", 
            preference_value: e.target.value
        }
        console.log("sending req", req)

        fetch(`http://${ip}:8000/change-preference`, {
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
    console.log(color)


    return(
        <div>
            <Navbar></Navbar>
            <div id='profile-main'>

                <div id='edit-profile'>
                        <p>Edit Profile</p>
                        <p>Change Username</p>
                        <p>Change Password</p>
                        <p>Change Email</p>
                        <p>Change Picture</p>
                </div>
                <div id='profile-preferences'>
                    <p>Preferences</p>
                    <p>Change Color</p>
                    <select id="color-select" onChange={changeColor}>
                        <option value="" selected disabled hidden>{color}</option>
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