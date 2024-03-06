import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Diagram } from "./components/Diagram";

function Gallery() {
    return(
    <div>
        <Navbar></Navbar>
        Test
        <Diagram stretch={4} diagramData={[1, [0,'E'],[1,'C'],[0,'G'],['X','X']]}/>
    </div>
    )
}

export default Gallery;