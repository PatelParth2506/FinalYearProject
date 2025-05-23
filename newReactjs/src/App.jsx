import React from "react";
import Signup from "./components/signup";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Mainchat from "./components/Mainchat.jsx"
import ChatRight from "./components/ChatRight";
import StoreHome from "./components/StoreHome";
import ProductDetails from "./components/ProductDetails";
import CartPage from "./components/CartPage";
import { Provider } from "react-redux";
import { store } from "./App/store.js";
import PaymentSuccess from "./components/PaymentSuccess.jsx";
import PaymentCancel from "./components/PaymentCancel.jsx";
import Photo from "./components/Photo.jsx";
import Loader from "./components/Loader.jsx";
import HomeLayout from "./components/HomeLayout.jsx";
import NavBarOfWeb from "./components/NavBarOfWeb.jsx";
import ProfileLayout from "./components/ProfileLayout.jsx";
import Navbar from "./components/Navbar.jsx";
import StoryLayout from "./components/StoryLayout.jsx";
import EditProfileLayout from "./components/EditprofileLayout.jsx";
import Home from "./components/AdminComponent/Home.jsx";
import Inventory from "./components/AdminComponent/Inventory.jsx";
import CURD from "./components/AdminComponent/CURD.jsx";
import AddProduct from "./components/AdminComponent/AddProduct.jsx";
import AddProducts from "./components/AdminComponent/AddProducts.jsx";
import Orders from "./components/AdminComponent/Orders.jsx";
import Customers from "./components/AdminComponent/Customers.jsx";
import AdminNavbar from "./components/AdminComponent/Navbar.jsx";
import AdminLayout from "./components/DevloperAdmin/AdminLayout.jsx";
import Dashboard from "./components/DevloperAdmin/Dashboard.jsx";
import UserList from "./components/DevloperAdmin/UsersList.jsx";
import RoleProtectedRoute from "./components/RoleProtectedRoute .jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

const Layout = ({ children }) => {
  const location = useLocation();

  const showStoreNavbar = location.pathname.startsWith("/store");
  const hideNavbar = location.pathname.startsWith("/login") || location.pathname === "/";
  const showAdminNavbar = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbar && (
        showAdminNavbar ? (
          <AdminNavbar />
        ) : showStoreNavbar ? (
          <Navbar />
        ) : (
          <NavBarOfWeb />
        )
      )}
      {children}
    </>
  );
}; 

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/home" element={<HomeLayout />} />            
            <Route path="/login" element={<Login />} />
            <Route path="/chatbox" element={<Mainchat />} />
            <Route path="/story" element={<StoryLayout />} />
            <Route path="/profilelayout/:userID?" element={<ProfileLayout />} />
            <Route path="/editprofilelayout" element={<EditProfileLayout />} />
            <Route path="/photo" element={<Photo />} />
            <Route path="/loader" element={<Loader />} />
            <Route path="/store" element={<StoreHome />} />
            <Route path="/store/product/:id" element={<ProductDetails />} />
            <Route path="/store/cart" element={<CartPage />} />
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/cancel" element={<PaymentCancel />} />
            <Route path="/getallpost/:userID/:postID" element={<HomeLayout />} />

            <Route path="/admin" element={<RoleProtectedRoute allowedRoles={['admin', 'creator']}><Home /></RoleProtectedRoute>} />
            <Route path="/admin/inventory" element={<RoleProtectedRoute allowedRoles={['admin', 'creator']}><Inventory /></RoleProtectedRoute>} />
            <Route path="/admin/Customers" element={<RoleProtectedRoute allowedRoles={['admin', 'creator']}><Customers /></RoleProtectedRoute>} />
            <Route path="/admin/Orders" element={<RoleProtectedRoute allowedRoles={['admin', 'creator']}><Orders /></RoleProtectedRoute>} />
            <Route path="/admin/updateProducts" element={<RoleProtectedRoute allowedRoles={['admin', 'creator']}><AddProducts /></RoleProtectedRoute>} />
            <Route path="/admin/updateProducts/product" element={<RoleProtectedRoute allowedRoles={['admin', 'creator']}><CURD /></RoleProtectedRoute>} />
            <Route path="/admin/addProduct" element={<RoleProtectedRoute allowedRoles={['admin', 'creator']}><AddProduct /></RoleProtectedRoute>} />

            <Route path="/devadmin" element={<AdminLayout />}>
              <Route path="dashboard" element={<RoleProtectedRoute allowedRoles={['admin', 'creator']}><Dashboard /></RoleProtectedRoute>} />
              <Route path="users" element={<RoleProtectedRoute allowedRoles={['admin', 'creator']}><UserList /></RoleProtectedRoute>} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;