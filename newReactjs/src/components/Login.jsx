import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Errorno5 from "./Errorno5";
import Success2 from "./Success2";
import axios from "axios";

const Login = () => {

    const [logindata,setloginData]=useState({
        username:"",
        password:""
    })
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const navigate=useNavigate();

    const loginData = async(e) => {

        e.preventDefault()

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
            console.log(response.data.statusCode)
                console.log(response)
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
        <div>
            <div className="font-sans bgimage min-h-screen flex justify-center items-center px-4 sm:px-10 lg:px-20">
            {showError && <Errorno5 />} 
           
            {showSuccess && <Success2 />}

                <form onSubmit={(e)=>{
                    loginData(e)
                }} className="loginForm flex flex-col gap-5 p-6 sm:p-6 rounded-lg bg-white shadow-lg w-full max-w-md sm:w-96">
                    <h2 id="signInText" className="text-center font-semibold text-xl sm:text-2xl">Sign In</h2>
                    <input value={logindata.username} 
                    onChange={(e)=>{
                        setloginData({
                            ...logindata,
                            username:e.target.value
                        })
                    }} 
                    className="px-4 py-3 w-full rounded-md  bg-transparent border border-gray-400" type="text" placeholder="email or username"/>

                    <input value={logindata.password} 
                    onChange={(e)=>{
                        setloginData({
                            ...logindata,
                            password:e.target.value
                        })
                    }} 
                    className="px-4 py-3 w-full rounded-md bg-transparent border border-gray-400" type="password" placeholder="Password"/>

                    <a className="text-blue-500 font-semibold text-right" href="">Forgot password?</a>
                    <input value="Log in" type="submit" className="loginButton hover:bg-blue-600 font-semibold text-white px-4 py-3 rounded-md w-full" />
                    <p className="text-gray-400 text-center text-sm sm:text-base">Don't have an account? <Link to="/" className="text-blue-500 font-semibold">sign up</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login

