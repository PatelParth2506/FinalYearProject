import React, { useEffect, useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import Errorno1 from "./Errorno1";
import Errorno2 from "./Errorno2";
import Errorno3 from "./Errorno3";
import Errorno4 from "./Errorno4";
import Success from "./Success";
// import Loader from "./Loader";
import axios from "axios";

const Signup = () => {

  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);


  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[_])(?=.*[!@#$%^&*])[a-zA-Z0-9_!@#$%^&*]{6,}$/;
  const usernameRegex = /^[a-zA-Z0-9_]{5,18}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [email, setEmail] = useState("");

  const [name, setName] = useState("");

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };


  const signUpData = async (e) => {
    e.preventDefault()

    if (!email || !name || !user || !password) {
      alert("All fields are mandatory to fill!")
      return false;
    }

    if (!emailRegex.test(email)) {
      setEmailError(true);
      setTimeout(() => {
        setEmailError(false);
      }, 4000);
      return false;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(true);
      setTimeout(() => {
        setPasswordError(false);
      }, 4000);
      return false;
    }

    if (password.length < 6 || password.length > 14) {
      setPasswordLengthError(true);
      setTimeout(() => {
        setPasswordLengthError(false);
      }, 4000);
      return false;
    }

    if (!usernameRegex.test(user)) {
      setUsernameError(true);
      setTimeout(() => {
        setUsernameError(false);
      }, 4000);
      return false;
    }

    else {
      const response = await axios.post("/api/user/register", {
        email: email,
        fullname: name,
        username: user,
        password: password,
        isBussiness:isChecked
      })
      console.log(response)


      setEmail("")
      setName("")
      setUser("")
      setPassword("")
    }

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/loader")

      setTimeout(() => {
        navigate("/photo", { state: { from: "signup" } });
      }, 4000);
    }, 2000);

  }

  return (
    <div>
        <div className="font-sans bgimage min-h-screen  flex justify-center items-center px-4 relative">
        {passwordError && <Errorno1 />}

        {usernameError && <Errorno2 />}

        {passwordLengthError && <Errorno3 />}

        {emailError && <Errorno4 />}

        {showSuccess && <Success />}

            <form onSubmit={(e)=>{
                signUpData(e)
            }} className="loginForm flex flex-col gap-4 px-6 py-9  w-full max-w-md sm:w-96 lg:w-1/2 rounded-md  bg-white">
                <h2 className="text-blue-500 text-center font-bold text-xl sm:text-2xl">Sign Up</h2>
                <input value={email} onChange={(e)=>{
                    setEmail(e.target.value)
                }} 
                className="px-4 py-3 w-full rounded-md  bg-transparent border-[1px]  border-gray-400" type="email" placeholder="Email"/>

          <input value={name} onChange={(e) => {
            setName(e.target.value)
          }}
            className="px-4 py-3 w-full rounded-md bg-transparent border-[1px] border-gray-400" type="text" placeholder="Name" />

          <input value={user} onChange={(e) => {
            setUser(e.target.value)
          }}
            className="px-4 py-3 w-full rounded-md  bg-transparent border-[1px]  border-gray-400" type="text" placeholder="Username" />


          <input value={password} onChange={(e) => {
            setPassword(e.target.value)
          }}

            className="px-4 py-3 w-full rounded-md  bg-transparent border-[1px]  border-gray-400" type="password" placeholder="Password" />
          <div className="p-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="w-4 h-4"
              />
              <span>Are you a Business Account?</span>
            </label>
          </div>
          <p className="text-gray-400 text-center my-2  text-sm sm:text-base">Already have an account? <Link to="/login" className="text-blue-500 font-semibold">Login</Link></p>

                <input type="submit" value="Sign up" className="bg-blue-500 font-semibold text-white px-4 py-3 rounded-md hover:bg-blue-700 w-full text-sm sm:text-base transition duration-300" />
                <p className="text-gray-400 text-center text-sm sm:text-base">By signing up, you agree to our <br /><span className="font-semibold">Terms,Data Policy</span> and {" "} <span className="font-semibold"> Cookies Policy.</span></p>
            </form>
        </div>
    </div>
  )
}

export default Signup