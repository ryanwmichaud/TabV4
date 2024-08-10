import './App.css';

import React, {createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';

export const GlobalContext  = createContext();

export const GlobalProvider = ({ children }) => {
  const [isMobileView, setisMobileView] = useState(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const [ profile, setProfile ] = useState(null);
  
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


  return (
    <GlobalContext.Provider value={{ profile, setProfile,isMobileView,  setisMobileView, isMobileMenuVisible, setIsMobileMenuVisible  }}>
      {children}
    </GlobalContext.Provider>
  )


}


const App = ()=>{



  return(
    <GlobalProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />

          </Routes>
        </div>
      </Router>

    </GlobalProvider>
    


  )
}

 
export default App
 
