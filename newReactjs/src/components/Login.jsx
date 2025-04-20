import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Errorno5 from "./Errorno5";
import Success2 from "./Success2";
import axios from "axios";

const Login = () => {
  const [logindata, setloginData] = useState({ 
    username: "",
    password: "" 
  });

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const loginData = async (e) => {
    e.preventDefault();

     if(!logindata.username || !logindata.password)
            {
                setShowError(true); 
                setTimeout(() => {
                  setShowError(false); 
                    console.log("showError Is False")
                }, 3000);
                return false;
            }

        try {
            const response=await axios.post("/api/user/login",logindata)
                setShowSuccess(true); 
                setTimeout(() => {
                  setShowSuccess(false);
                }, 3000);
            navigate("/home")
        } catch (error) {
            console.log(error)
            setShowError(true)    
            setTimeout(() => {     
                setShowError(false);
                console.log("showError is false");
            }, 3000);
        }           
        
        console.log(logindata)        
              
                setloginData({
                    username:"",
                    password:""
                })
            }
    

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 flex justify-center items-center px-6 sm:px-10 py-10 sm:py-2 relative">
      {showError && <Errorno5 />}
      {showSuccess && <Success2 />}

      <div className="max-w-4xl md:h-[450px] min-h-[400px] bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 transition-all">
       
        <div className="w-full p-8 md:p-7 flex flex-col justify-center gap-4 sm:gap-5 bg-white/70">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 text-center">Login</h2>
          <p className="text-sm sm:text-base text-center text-gray-500 mb-4">Glad to see you again!</p>

          <form onSubmit={(e)=>{
            loginData(e)
          }} className="space-y-4">
            <input value={logindata.username}
              onChange={(e) => {
                setloginData({ 
                  ...logindata, 
                  username: e.target.value 
                })
              }}
              type="text"
              placeholder="Email or username"
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:ring-2 focus:ring-blue-400 transition duration-300 placeholder-slate-400  text-black placeholder:font-thin"
            />

            <input
              value={logindata.password}
              onChange={(e) => {
                setloginData({ 
                  ...logindata, 
                  password: e.target.value 
                })
              }}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:ring-2 focus:ring-blue-400 transition duration-300 placeholder-slate-400 text-black placeholder:font-thin"
            />

            <input
              type="submit"
              value="Log in"
              className="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg w-full"
            />

            <p className="text-sm text-center text-gray-500">
              Don’t have an account?{" "}
              <Link to="/" className="text-blue-600 font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>

         <div
          className="hidden md:flex items-end justify-start text-white p-6 md:p-8 relative"
          style={{
            backgroundImage: `url('/purple5.jpg')`,
            backgroundSize: "cover",
            backgroundPositionX:"100%"
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-blue-500 to-purple-600 opacity-60 z-0" />

          <div className="z-10 text-left space-y-0 pl-2 pb-6">
            <h3 className="text-2xl font-semibold">Hey</h3>
            <h3 className="text-2xl font-semibold">Welcome</h3>
            <h3 className="text-2xl font-semibold">Back !!</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;



