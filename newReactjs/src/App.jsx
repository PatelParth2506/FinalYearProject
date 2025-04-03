import React from "react"
import Signup from "./components/signup"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import ChatLeft from "./components/ChatLeft"
import Chatrightempty from "./components/Chatrightempty"
import Chatbox from "./components/Chatbox"
import ChatRight from "./components/ChatRight"
import Editprofile from "./components/Editprofile"
import StoreHome from "./components/StoreHome"
import ProductDetails from "./components/ProductDetails"
import CartPage from "./components/CartPage"
import { Provider } from "react-redux"
import { store } from "./App/store.js"
import PaymentSuccess from "./components/PaymentSuccess.jsx"
import PaymentCancel from "./components/PaymentCancel.jsx"
import Photo from "./components/Photo.jsx"
import Loader from "./components/Loader.jsx"
import HomeLayout from "./components/HomeLayout.jsx"
import NavBarOfWeb from "./components/NavBarOfWeb.jsx"
import ProfileLayout from "./components/ProfileLayout.jsx"
import EditprofileLayout from "./components/EditprofileLayout.jsx"
import StoryLayout from "./components/StoryLayout.jsx"


const Layout = ({ children }) => {
  const location = useLocation()

  const showNavbar = location.pathname.startsWith("/store")

  return (
    <>
      {showNavbar && <NavBarOfWeb />}
      {children}
    </>
  )
}

const App = () => {
  return (
    <Provider store={store}>
   <BrowserRouter>
      <Layout>
      <Routes>
          <Route path="/"  element={<Signup />} />
          <Route path="/login"  element={<Login />} />
          <Route path="/home"  element={<HomeLayout />} />
          <Route path="/chatleftpart"  element={<ChatLeft />} />
          <Route path="/chatrightempty"  element={<Chatrightempty />} />
          <Route path="/story"  element={<StoryLayout />} />
          <Route path="/chatbox"  element={<Chatbox />} />
          <Route path="/chatrightpart"  element={<ChatRight />} />
          <Route path="/editprofile"  element={<Editprofile />} />
          <Route path="/profilelayout/:userID?"  element={<ProfileLayout />} />
          <Route path="/editprofilelayout"  element={<EditprofileLayout />} />
          <Route path="/photo"  element={<Photo />} />
          <Route path="/loader"  element={<Loader />} />
          <Route path="/store" element={<StoreHome />} />
          <Route path="/store/product/:id" element={<ProductDetails />} />
          <Route path="/store/cart" element={<CartPage />} />
          <Route path="/success" element={<PaymentSuccess/>}/>
          <Route path="/success" element={<PaymentCancel/>}/>
       </Routes>
      </Layout>
       
   </BrowserRouter>
  </Provider>
  );
}

export default App