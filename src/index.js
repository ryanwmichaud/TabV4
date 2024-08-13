import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { GoogleOAuthProvider } from '@react-oauth/google'

const id = "504190667265-1cjktd0sv05379lf3tte68h82n6l4vbh" //google client id
const root = ReactDOM.createRoot(document.getElementById('root'))
 
root.render(
  <GoogleOAuthProvider clientId={id}>
    <App/>
  </GoogleOAuthProvider>
)



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
