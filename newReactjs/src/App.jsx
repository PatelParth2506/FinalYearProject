import React from "react"
import Signup from "./components/signup"
import { BrowserRouter,Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import ChatLeft from "./components/ChatLeft"
import Chatrightempty from "./components/Chatrightempty"
import Chatbox from "./components/Chatbox"
import ChatRight from "./components/ChatRight"
import Editprofile from "./components/Editprofile"
import Profile from "./components/Profile"

const App = () => {

  return(
   <BrowserRouter>
       <Routes>
         <Route path="/"  element={<Signup />} />
         <Route path="/login"  element={<Login />} />
         <Route path="/home"  element={<Home />} />
         <Route path="/chatleftpart"  element={<ChatLeft />} />
         <Route path="/chatrightempty"  element={<Chatrightempty />} />
         <Route path="/chatbox"  element={<Chatbox />} />
         <Route path="/chatrightpart"  element={<ChatRight />} />
         <Route path="/editprofile"  element={<Editprofile />} />
         <Route path="/profile"  element={<Profile />} />
       </Routes>
   </BrowserRouter>
    
  )
}

export default App