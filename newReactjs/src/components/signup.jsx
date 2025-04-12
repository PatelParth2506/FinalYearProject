
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [isChecked, setIsChecked] = useState(false);


  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[_])(?=.*[!@#$%^&*])[a-zA-Z0-9_!@#$%^&*]{6,}$/;
  const usernameRegex = /^[a-zA-Z0-9_]{5,18}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const signUpData = async (e) => {
    e.preventDefault();

    if (!email || !name || !user || !password) {
      alert("All fields are required!");
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

    else
    {
    const response = await axios.post("/api/user/register", {
      email:email,
      fullname: name,
      username: user,
      password:password,
      isBussiness:isChecked
    });

    console.log(response);

    setEmail("");
    setName("");
    setUser("");
    setPassword("");
  }

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/loader");

      setTimeout(() => {
         navigate("/photo", { state: { from: "signup" } });
      }, 4000);
    }, 2000);
  };
  return (

<div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 flex justify-center items-center px-6 sm:px-10 py-10 sm:py-2 relative">
      {passwordError && <Errorno1 />}
      {usernameError && <Errorno2 />}
      {passwordLengthError && <Errorno3 />}
      {emailError && <Errorno4 />}
      {showSuccess && <Success />}

      <div className="max-w-6xl w-full bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 transition-all">
       
        <div className="md:flex items-center justify-center bg-gradient-to-tr from-blue-500 to-purple-600 p-6 md:p-8">
        <img 
    src="https://cdni.iconscout.com/illustration/premium/thumb/user-login-4489447-3723275.png"
    alt="SignUp image"
    className="w-80 md:w-96 object-contain animate-fade-in drop-shadow-xl m-auto"
  />
        </div>

     
        <form onSubmit={(e)=>{
                signUpData(e)
            }}  className="w-full p-8 md:p-7 flex flex-col justify-center gap-4 sm:gap-5 bg-white/70"
        >
         <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 text-center">Create Your Account</h2>
         <p className="text-sm sm:text-base text-center text-gray-500 mb-4">Welcome! Join us and start your journey.</p>

          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className="px-4 py-3 rounded-xl bg-white border border-gray-300 focus:ring-2 focus:ring-blue-400 transition duration-300 placeholder-slate-400 font-thin"
            type="email"
            placeholder="Email"
          />

          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
            className="px-4 py-3 rounded-xl bg-white border border-gray-300 focus:ring-2 focus:ring-blue-400 transition duration-300 placeholder-slate-400 font-thin"
            type="text"
            placeholder="Name"
          />

          <input
            value={user}
            onChange={(e) => {
               setUser(e.target.value)
              }}
            className="px-4 py-3 rounded-xl bg-white border border-gray-300 focus:ring-2 focus:ring-blue-400 transition duration-300 placeholder-slate-400 font-thin"
            type="text"
            placeholder="Username"
          />
          <input
            value={password}
            onChange={(e) => {
               setPassword(e.target.value)
            }}
            className="px-4 py-3 rounded-xl bg-white border border-gray-300 focus:ring-2 focus:ring-blue-400 transition duration-300 placeholder-slate-400 font-thin"
            type="password"
            placeholder="Password"
          />

          <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="w-4 h-4"
              />
              <h2 className="text-gray-700">Do you want to use business account?</h2>
          </div>

          <input
            type="submit" value="Sign Up"
            className="mt-2 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:scale-95"
          />
          
          <p className="text-sm text-center text-gray-500 mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login</Link>
          </p>

          <p className="text-sm text-center text-gray-400 mt-4">
            By signing up, you agree to our <br />
            <span className="font-semibold">Terms</span>,{" "}
            <span className="font-semibold">Data Policy</span> and{" "}
            <span className="font-semibold">Cookies Policy</span>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;