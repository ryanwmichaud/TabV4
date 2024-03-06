import React from "react";
import { Link } from 'react-router-dom';




function Navbar(){

    return(
        <div className="navbar">  
          <Link className='title' to={"/"}> Fretbchord Explchorder </Link>
          <Link className="other" to={"/gallery"}>  Gallery</Link>
          <Link className='login' to={"/Login"}> Login </Link> 

        </div>
    );

}

export default Navbar;