import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import home from '../assets/home.png'
import reels from '../assets/reels.png'
import heart from '../assets/heart.png'
import user from '../assets/user.png'
import search from '../assets/search.png'
import bookmark from '../assets/bookmark.png'
import exit from '../assets/exit.png'
import store from '../assets/store.png'
import chat from '../assets/chat.png'
import settings from '../assets/settings.png'
import axios from 'axios'

const Iconswithname = ({setshow}) => {
  const [isBusiness,setIsBusiness]=useState(false)
  const [data,setData]=useState({})
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchdatabyid=async()=>{
      const res=await axios.get(`/api/user/getUserProfile`,{
        withCredentials:true
      })
      if(res.data.data.isBussiness === false || res.data.data.isBussiness === undefined){
        setIsBusiness(false)
      }else{
        setIsBusiness(true)
        setData(res.data.data)
      }
    }
    fetchdatabyid()
  })

  const handleclick=()=>{
    if(isBusiness){
      navigate("/admin",{state:{data:data}})
    }else{
      navigate("/home")
    }
  }

  const handlelogout=async()=>{
      try {
        const res=await axios.post("/api/user/logout",{
          withCredentials: true
        })
        console.log("LogOuted SuccessFully",res.data)
        navigate("/login")
      } catch (error) {
        console.log("Can't Done Logout",error)
      }
  }

  return (
    <div className='overFlow loginForm w-[220px] h-[93vh] py-8 px-2 flex flex-col gap-y-7 justify-between items-start z-10 fixed sm:static bg-white md:relative overflow-auto'>

      <div className='w-full flex flex-col cursor-pointer flex-2 justify-between gap-2'>
        <div className='flex items-center gap-x-5 px-3 py-2 hover:bg-gray-100 rounded-md' onClick={() => { navigate("/home"); setshow() }}>
          <img src={home} alt="" className='w-6 h-6 ' />
          <span>Home</span>
        </div>

        <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 rounded-md' onClick={() => { navigate("/profilelayout"); setshow()  }}>
          <img src={user} alt="" className='w-6 h-6 ' />
          <span>Profile</span>
        </div>

        <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 rounded-md'>
          <img src={search} alt="" className='w-6 h-6 ' />
          <span>Search</span>
        </div>

        <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 rounded-md' onClick={()=>{navigate("/story"); setshow() }}>
          <img src={reels} alt="" className='w-6 h-6 ' />
          <span>Stories</span>
        </div>

        <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 rounded-md' onClick={() => { navigate("/chatbox"); setshow()  }}>
          <img src={chat} alt="" className='w-6 h-6 ' />
          <span>Message</span>
        </div>
        
        <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 rounded-md' onClick={handleclick}>
          <img src={heart} alt="" className='w-6 h-6 ' />
          <span>{isBusiness?"Admin" : "Instruction"}</span>
        </div>

        <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 rounded-md'>
          <img src={bookmark} alt="" className='w-6 h-6 ' />
          <span>Bookmarks</span>
        </div>

        <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 rounded-md' onClick={()=>{navigate("/store"); setshow() }}>
          <img src={store} alt="" className='w-6 h-6 ' />
          <span>Store</span>
        </div>

      </div>

      <div className="w-full flex flex-1 items-end">
        <div className="w-full flex flex-col cursor-pointer gap-2">
          <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 rounded-md'>
            <img src={settings} alt="" className='w-6 h-6 ' />
            <span>Settings</span>
          </div>

          <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 rounded-md' onClick={handlelogout}>
            <img src={exit} alt="" className='w-6 h-6 ' />
            <span>Logout</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Iconswithname
