import React, { useEffect, useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import Errorno1 from "./Errorno1";
import Errorno2 from "./Errorno2";
import Errorno3 from "./Errorno3";
import Errorno4 from "./Errorno4";
import Success from "./Success";
import axios from "axios";

const Signup = () => {

    const [passwordError, setPasswordError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordLengthError, setPasswordLengthError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[_])(?=.*[!@#$%^&*])[a-zA-Z0-9_!@#$%^&*]{6,}$/;
    const usernameRegex = /^[a-zA-Z0-9_]{5,18}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    const [email,setEmail]= useState("");

    const [name,setName]= useState("");

    const [user,setUser]= useState("");

    const [password,setPassword]= useState("");

    const navigate= useNavigate();

    
    
    const signUpData = async(e) => {
        console.log(email)
        console.log(name)
        console.log(user)
        console.log(password)
        e.preventDefault()

        if(!email || !name || !user || !password)
        {
            alert("All fields are mandatory to fill!")
            return false;
        }
        const response=await axios.post("/api/user/register",{
          email:email,
          name:name,
          username:user,
          password:password,
        })
        console.log(response)

        if(!emailRegex.test(email)) {
            setEmailError(true);
            setTimeout(() => {
              setEmailError(false);
            }, 4000);
            return false;
          }
                    
        // if(!passwordRegex.test(password))
        // {
        //     setPasswordError(true);
        //     setTimeout(() => {
        //         setPasswordError(false);
        //     }, 4000);
        //     return false;
        // }

        // if(password.length < 6 || password.length > 14) {
        //     setPasswordLengthError(true);
        //     setTimeout(() => {
        //       setPasswordLengthError(false);
        //     }, 4000);
        //     return false;
        //   }
                    
        // localStorage.clear()
        if(!usernameRegex.test(user)) {
            setUsernameError(true);
            setTimeout(() => {
                setUsernameError(false);
            }, 4000);
            return false;
          }

        else
        {
        const userData = {
            username: user,
            name: name,
            password: password,
            email: email,
          };

          console.log(userData)
        
        setEmail("")
        setName("")
        setUser("")
        setPassword("")
        }

        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          // window.location.href = "/login";
          navigate("/login")
        }, 1500);
  
    }

    return (
    <div>
        <div id="bg" className="w-screen h-screen  flex justify-center items-center">
        {passwordError && (
          <div className="absolute top-[-24px] left-0 w-screen h-screen">
            <Errorno1 />
          </div>
        )}

        {usernameError && (
          <div className="absolute top-[-24px] left-0 w-screen h-screen">
            <Errorno2 />
          </div>
        )}

        {passwordLengthError && (
            <div className="absolute top-[-24px] left-0 w-screen h-screen">
            <Errorno3 />
        </div>
        )}

        {emailError && (
            <div className="absolute top-[-24px] left-0 w-screen h-screen">
            <Errorno4 />
        </div>
        )}

        {showSuccess && (
            <div className="absolute top-[-24px] left-0 w-screen h-screen">
        <Success />
           </div>
        )}


            <form onSubmit={(e)=>{
                signUpData(e)
            }} className="loginForm flex flex-col gap-4 px-6 py-9 h-auto rounded-md  bg-white">
                <h2 id="signInText" className="text-center font-semibold text-2xl">Sign Up</h2>
                <input value={email} onChange={(e)=>{
                    setEmail(e.target.value)
                }} 
                className="px-4 py-3 w-96 rounded-md  bg-transparent border-[1px]  border-gray-400" type="email" placeholder="Email"/>

                <input value={name} onChange={(e)=>{
                    setName(e.target.value)
                }} 
                className="px-4 py-3 w-96 rounded-md bg-transparent border-[1px] border-gray-400" type="text" placeholder="Full Name"/>

                <input value={user} onChange={(e)=>{
                    setUser(e.target.value)
                }} 
                className="px-4 py-3 w-96 rounded-md  bg-transparent border-[1px]  border-gray-400" type="text" placeholder="Username"/>

                <input value={password} onChange={(e)=>{
                    setPassword(e.target.value)
                }} 
                className="px-4 py-3 w-96 rounded-md  bg-transparent border-[1px]  border-gray-400" type="password" placeholder="Password"/>

               <p className="text-gray-400 text-center my-2">Already have an account? <Link to="/login" className="text-blue-500 font-semibold">Login</Link></p>

                <input type="submit" value="Sign up" className="loginButton font-semibold text-white px-4 py-3 rounded-md " />
                <p className="text-gray-400 text-center">By signing up, you agree to our <br /><span className="font-semibold">Terms,Data Policy</span> and<span className="font-semibold"> Cookies <br />Policy.</span></p>
            </form>
        </div>
    </div>
    )
}

export default Signup