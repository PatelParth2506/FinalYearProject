import React from "react"
import Signup from "./components/signup"
import { BrowserRouter,Routes, Route, useLocation } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import ChatLeft from "./components/ChatLeft"
import Chatrightempty from "./components/Chatrightempty"
import Chatbox from "./components/Chatbox"
import ChatRight from "./components/ChatRight"
import Editprofile from "./components/Editprofile"
import Profile from "./components/Profile"
import StoreHome from "./components/StoreHome"
import ProductDetails from "./components/ProductDetails"
import CartPage from "./components/CartPage"
import { Provider } from "react-redux"
import { store } from "./App/store.js"
import Navbar from "./components/Navbar.jsx"
import PaymentSuccess from "./components/PaymentSuccess.jsx"
import PaymentCancel from "./components/PaymentCancel.jsx"
import StoryContainer from "./components/StoryContainer.jsx"
import Photo from "./components/Photo.jsx"
import Loader from "./components/Loader.jsx"

const Layout = ({ children }) =>{
    const location = useLocation()

    const showNavbar = location.pathname.startsWith("/store")

    return(
      <>
        {showNavbar && <Navbar />}
        {children}
      </>
    )
}

const App = () => {
  return(
    <Provider store={store}>
   <BrowserRouter>
      <Layout>
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
          <Route path="/photo"  element={<Photo />} />
          <Route path="/loader"  element={<Loader />} />
          <Route path="/store" element={<StoreHome />} />
          <Route path="/store/product/:id" element={<ProductDetails />} />
          <Route path="/store/cart" element={<CartPage />} />
          <Route path="/success" element={<PaymentSuccess/>}/>
          <Route path="/success" element={<PaymentCancel/>}/>
          <Route path="/story" element={<StoryContainer/>}/>
       </Routes>
      </Layout>
       
   </BrowserRouter>
  </Provider>
  );
}

export default App