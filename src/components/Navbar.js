
import React, {useContext} from "react";
import { Link  } from 'react-router-dom';
import { MenuButton } from "./MenuButton";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../App";
import { googleLogout } from "@react-oauth/google";

import defaultPicture from '../assets/default-profile-pic.png';


const Navbar = () => {


    const location = useLocation();
    const {profile, setProfile, isMobileView, isMobileMenuVisible, setIsMobileMenuVisible} = useContext(GlobalContext)
    
 


    return(
        <div className="navbar">  
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
            <div className="nav-user-true">
              <div className="nav-user"  onClick = {()=>{ 
                              googleLogout()
                              setProfile(null)
                              }}>
                <img className="nav-picture" src={(profile.picture ? profile.picture : defaultPicture)} alt="profile"></img>
                <div className="nav-name" >{profile.first_name}</div>
              </div>
             
      
            </div>
            
          ) : (
            <Link className='nav-login-link' to={"/Login"}> Login </Link>
          )}
          
          

        </div>
    );

}

export  {Navbar};