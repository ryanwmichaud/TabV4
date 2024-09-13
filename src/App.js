import './App.css'
import React, {createContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'
import { Profile } from './pages/Profile'

const ip = process.env.REACT_APP_IP
export const GlobalContext  = createContext()

export const getProfile = async (profileEmail) => {
  const req = {
      profileEmail: profileEmail
  }
  try{
      const response = await fetch(`http://localhost:8000/get-profile`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(req),
          })
      if (!response.ok) { 
          throw new Error('network response not ok')
      }
      const data = await response.json()
      return data

  }catch (error){
      console.error("fetch error:", error)
  }
  

}

export const GlobalProvider = ({ children }) => {
  const [isMobileView, setisMobileView] = useState(false)
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false)
  const [ profile, setProfile ] = useState(null)
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
/*
  useEffect(()=>{
    if(profile && !profile.username){
      //make them make username
    }
  },[])
    useEffect(()=>{
    if(!profile){
      //make them login. nav to it
    }
  },[])
  */

  const closeMobileMenu = ()=>{
    console.log("closing mobile menu")
    setIsMobileMenuVisible(false)
  }


  return (
    <GlobalContext.Provider value={{ profile, setProfile,isMobileView,  setisMobileView, isMobileMenuVisible, setIsMobileMenuVisible, closeMobileMenu  }}>
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
            <Route path="/profile" element={<Profile/>} />


          </Routes>
        </div>
      </Router>

    </GlobalProvider>
    


  )
}

 
export default App
 
