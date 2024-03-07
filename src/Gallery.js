import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Diagram } from "./components/Diagram";

function Gallery() {
    return(
    <div> 
        <Navbar></Navbar>
        Test
        <Diagram diagramData={[1, 4, [0,'E'],[1,'C'],[0,'G'],[null,null]]}/>
    </div>
    )
}

export default Gallery;