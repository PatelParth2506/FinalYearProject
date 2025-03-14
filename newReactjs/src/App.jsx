import React from "react"
import Signup from "./components/signup"
import { BrowserRouter,Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/login"
import ChatLeft from "./components/ChatLeft"
import Chatrightempty from "./components/Chatrightempty"
import Chatbox from "./components/Chatbox"
import ChatRight from "./components/ChatRight"

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

       </Routes>
   </BrowserRouter>
    
  )
}

export default App