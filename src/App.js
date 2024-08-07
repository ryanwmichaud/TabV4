import './App.css';

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Login"
import Home from './Home';



const App = ()=>{

  return(
    <Router>
    <div>
      <nav> {}  </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  </Router>


  )
}

 
export default App
 
