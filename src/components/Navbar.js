
import React, {useContext, useState} from "react"
import { Link  } from 'react-router-dom'
import { MenuButton } from "./MenuButton"
import { useLocation, useNavigate} from "react-router-dom"
import { GlobalContext } from "../App"
import { googleLogout } from "@react-oauth/google"

import defaultPicture from '../assets/default-profile-pic.png'

const Navbar = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const {profile, setProfile, isMobileView, isMobileMenuVisible, setIsMobileMenuVisible} = useContext(GlobalContext)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  //console.log(profile)
  return(
      <div className="navbar" >  
      { location.pathname === '/' &&
        !isMobileView && !isMobileMenuVisible &&  
        <MenuButton 
            isMobileMenuVisible={isMobileMenuVisible} 
            setIsMobileMenuVisible={setIsMobileMenuVisible} 
          >
        </MenuButton>

      } 
        <Link className='title' to={"/"}> Fretbchord Explchorder </Link>
        {profile ? (
            <div className="nav-user" onClick={toggleProfileMenu}>
              <img className="nav-picture" src={(profile.profile_photo ? profile.profile_photo : defaultPicture)} alt="profile"></img>
              <div className="nav-name" >{profile.first_name}</div>
            </div>

            
                      
        ) : (
          <Link className='nav-login-link' to={"/Login"}> Login </Link>
        )}


        {isProfileMenuOpen && 
          <div id="nav-profile-menu">
            <dic className="nav-profile-menu-link-container">
              <Link id="nav-profile-menu-profile" className="nav-profile-menu-item" to={"/Profile"} > Profile </Link>

              <a id="nav-profile-menu-logout"
              className="nav-profile-menu-item"
                onClick = {()=>{ 
                          googleLogout()
                          setProfile(null)
                          setIsProfileMenuOpen(false)
                          navigate('/login')
                }}>
                Logout
              </a>
            </dic>
            
          </div>
        }
        
        

      </div>
  )

}

export  {Navbar}