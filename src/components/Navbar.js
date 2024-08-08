
import React, {useContext} from "react";
import { Link  } from 'react-router-dom';
import { MenuButton } from "./MenuButton";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../App";
import { googleLogout } from "@react-oauth/google";




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
            <div>
              {profile.name}
              <img src={profile.picture} alt="profile picture"></img>
              <button onClick = {()=>{  googleLogout()
                                        setProfile(null)}}>
                Logout
              </button>
            </div>
            
          ) : (<Link className='login-link' to={"/Login"}> Login </Link>
          )}
          

        </div>
    );

}

export  {Navbar};