import React from 'react'
import { Navbar } from '../components/Navbar'


const Profile = () =>{

    const changeColor = (e) => {
        console.log(e.target.value)
        let color
        if(e.target.value === "red"){
            color = "rgb(204, 110, 110)"
        }else if(e.target.value === "green"){
            color = "rgb(124, 178, 130)" 
        }else if(e.target.value === "blue"){
            color = "rgb(91, 169, 218)"
        }
        document.documentElement.style.setProperty('--primary-color', color)

    }


    return(
        <div>
            <Navbar></Navbar>
            <div id='profile-main'>

                <div id='edit-profile'>
                        <p>Edit Profile</p>
                        <p>Change Username</p>
                        <p>Change Password</p>
                        <p>Change Email</p>
                </div>
                <div id='profile-preferences'>
                    <p>Preferences</p>
                    <p>Change Color</p>
                    <select id="color-select" onChange={changeColor}>
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