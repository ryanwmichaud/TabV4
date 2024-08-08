
import React from "react";
import { Link  } from 'react-router-dom';
import { MenuButton } from "./MenuButton";
import { useLocation } from "react-router-dom";




const Navbar = ({isMobileMenuVisible, setIsMobileMenuVisible, isMobileView}) => {

    const location = useLocation();

    

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
          <Link className='login-link' to={"/Login"}> Login </Link>

        </div>
    );

}

export  {Navbar};
//          <Link className='Login' to={"/Login"}> Login </Link>
