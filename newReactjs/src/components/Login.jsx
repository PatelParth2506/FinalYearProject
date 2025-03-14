import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Errorno5 from "./Errorno5";
import Success2 from "./Success2";
import axios from "axios";

const Login = () => {

    // const [username,setUsername]=useState("");

    // const [signinpassword,setSigninpassword]= useState("");
    const [logindata,setloginData]=useState({
        username:"",
        password:""
    })
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const navigate=useNavigate();


    const loginData = async(e) => {
        // console.log(username)
        // console.log(signinpassword)

        e.preventDefault()

        if(!logindata.username || !logindata.password)
            {
                setShowError(true); // error show karne ke liye state variable ko true karna
                setTimeout(() => {
                  setShowError(false); // error hide karne ke liye state variable ko false karna
                }, 3000);
                return false;
            }

        try {
            const response=await axios.post("/api/user/login",logindata)
            console.log(response)
            setShowSuccess(true); 
                setTimeout(() => {
                  setShowSuccess(false);
                }, 3000);
            navigate("/home")
        } catch (error) {
            console.log(error)
        }           
        
               console.log(logindata)        
              
                setloginData({
                    username:"",
                    password:""
                })
                if(!userFound)
                    {
                        alert("Can't find user")
                    }
            }
    

    return (
        <div>
            <div id="bg" className="w-screen h-screen  flex justify-center items-center">
            {showError && (
          <div className="absolute top-[0px] left-0 w-screen h-screen">
            <Errorno5 />
          </div>
        )} 
             {/* error component show karne ke liye */}
            {/* "Agar showError true hai, toh <Errorno5 /> component ko render karo." */}

            {showSuccess && (
               <div className="absolute top-[0px] left-0 w-screen h-screen">
               <Success2 />
             </div>
            )}


                <form onSubmit={(e)=>{
                    loginData(e)
                }} className="loginForm flex flex-col gap-4 px-6 py-16 rounded-md bg-white h-auto">
                    <h2 id="signInText" className="text-center font-semibold text-2xl ">Sign In</h2>
                    <input value={logindata.username} 
                    onChange={(e)=>{
                        setloginData({
                            ...logindata,
                            username:e.target.value
                        })
                    }} 
                    className="px-4 py-3 w-96 rounded-md  bg-transparent border-[1px]  border-gray-400" type="text" placeholder="email or username"/>

                    <input value={logindata.password} 
                    onChange={(e)=>{
                        setloginData({
                            ...logindata,
                            password:e.target.value
                        })
                    }} 
                    className="px-4 py-3 w-96 rounded-md bg-transparent border-[1px] border-gray-400" type="password" placeholder="Password"/>

                    <a className="text-blue-500 font-semibold text-right mt-[-14px]" href="">Forgot password?</a>
                    <input value="Log in" type="submit" className="loginButton font-semibold text-white px-4 py-3 rounded-md mt-3" />
                    <p className="text-gray-400 mt-4 text-center">Don't have an account? <Link to="/" className="text-blue-500 font-semibold">sign up</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login

