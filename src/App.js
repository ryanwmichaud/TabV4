import './App.css'
import React, {createContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'
import { Profile } from './pages/Profile'


const ip = process.env.REACT_APP_IP
export const GlobalContext  = createContext()

export const getProfile = async (token) => {
  //console.log("getting profile w token", token)
 
  try{
    
      const response = await fetch(`http://${ip}:8000/get-profile`, {
          headers: { Authorization: `Bearer ${token}` },
      })
      
      const profileData = await response.json()
      return profileData

  }catch (error){
      console.error("error fetching profile:", error)
  }
}

export const getPrefereces = async (token) => {
  //console.log("getting preferences w token", token)
  try{
    
      const response = await fetch(`http://${ip}:8000/get-preferences`, {
          headers: { Authorization: `Bearer ${token}` },
      })
      
      const preferences = await response.json()
      return preferences

  }catch (error){
      console.error("error fetching preferences:", error)
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

      if (window.innerWidth < 965) {
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

  useEffect( ()=>{
    
    //set preferences on profile change
    async function getPreferecesCallback(){
      const token = localStorage.getItem('token')
      if (profile){
        const response = await getPrefereces(token)
        const preferences = response.preferences 
      
        for(const preference of preferences){
          if (preference.preference_key === 'color'){
            document.documentElement.style.setProperty('--primary-color', `var(--${preference.preference_value})`)
          }
        }
      }else{
        document.documentElement.style.setProperty('--primary-color', `var(--blue)`)
        //console.log('logging out and removing token')
        localStorage.removeItem('token')

      }
      
    }
    getPreferecesCallback()
    
  }, [profile])
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
    //console.log("closing mobile menu")
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
 
