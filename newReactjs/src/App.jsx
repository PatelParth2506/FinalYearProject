import React from "react"
import Signup from "./components/signup"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
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
import Navbar from "./components/Navbar.jsx"
import StoryLayout from "./components/StoryLayout.jsx"
import AdminLayout from "./components/AdminLayout.jsx"
import EditprofileLayout from "./components/EditprofileLayout.jsx"
import Home from "./components/AdminComponent/Home.jsx"
import Inventory from "./components/AdminComponent/Inventory.jsx"
import CURD from "./components/AdminComponent/CURD.jsx"
import AddProduct from "./components/AdminComponent/AddProduct.jsx"
import AddProducts from "./components/AdminComponent/AddProducts.jsx"
import Orders from "./components/AdminComponent/Orders.jsx"
import Customers from "./components/AdminComponent/Customers.jsx"

const Layout = ({ children }) => {
  const location = useLocation()

  const showStoreNavbar = location.pathname.startsWith("/store")
  const hidenavbar = location.pathname.startsWith("/login") || location.pathname === "/"
  return (
    <>
      {!hidenavbar && (showStoreNavbar ? <Navbar /> : <NavBarOfWeb />)}
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
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<HomeLayout />} />
            <Route path="/chatleftpart" element={<ChatLeft />} />
            <Route path="/chatrightempty" element={<Chatrightempty />} />
            <Route path="/story" element={<StoryLayout />} />
            <Route path="/chatbox" element={<Chatbox />} />
            <Route path="/chatrightpart" element={<ChatRight />} />
            <Route path="/profilelayout/:userID?" element={<ProfileLayout />} />
            <Route path="/editprofilelayout" element={<EditprofileLayout />} />
            <Route path="/photo" element={<Photo />} />
            <Route path="/loader" element={<Loader />} />
            <Route path="/store" element={<StoreHome />} />
            <Route path="/store/product/:id" element={<ProductDetails />} />
            <Route path="/store/cart" element={<CartPage />} />
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/cancel" element={<PaymentCancel />} />
            <Route path="/getallpost/:userID/:postID" element={<HomeLayout />} />
            <Route path="/storeadmin/home" element={<Home />} />
            <Route path="/storeadmin/inventory" element={<Inventory />} />

            <Route path="/admin" element={<Home />} />
            <Route path="/admin/inventory" element={<Inventory />} />
            <Route path="/admin/Customers" element={<Customers />} />
            <Route path="/admin/Orders" element={<Orders />} />
            <Route path="/admin/updateProducts" element={<AddProducts />} />
            <Route path="/admin/updateProducts/product" element={<CURD />} />
            <Route path="/admin/addProduct" element={<AddProduct />} />

          </Routes>
        </Layout>

      </BrowserRouter>
    </Provider>
  );
}

export default App