import './App.css';

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';



const App = ()=>{


  
  const [isMobileView, setisMobileView] = useState(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

  //get height
  useEffect(() => {
    
    const handleResize = () => {
      
      const vh = window.innerHeight * 0.01 //calc vh accounting for mobile toolbars
      document.documentElement.style.setProperty('--vh', `${vh}px`)

      if (window.innerWidth < 860) {
        setisMobileView(false)
      } else {
        setisMobileView(true)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {  //clean up
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  return(
    <Router>
    <div>
      <nav> {}  </nav>
      <Routes>
        <Route path="/" element={<Home isMobileView={isMobileView} setisMobileView={setIsMobileMenuVisible}  isMobileMenuVisible={isMobileMenuVisible} setIsMobileMenuVisible={setIsMobileMenuVisible} />} />
        <Route path="/login" element={<Login isMobileView={isMobileView} setisMobileView={setIsMobileMenuVisible}  isMobileMenuVisible={isMobileMenuVisible} setIsMobileMenuVisible={setIsMobileMenuVisible} />} />
      </Routes>
    </div>
  </Router>


  )
}

 
export default App
 
