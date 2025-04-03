import React from 'react'
import { useNavigate } from 'react-router-dom'

const Iconswithname = () => {

    const navigate = useNavigate();
    
  return (
    <div className='bg-slate-950 w-[250px] h-screen flex px-3 py-8 flex-col gap-y-7 text-slate-200 justify-between items-start border-r-2 border-slate-200'>
       <div className='flex flex-col gap-4 cursor-pointer w-full'>
          <div className='flex items-center gap-x-2 px-2 rounded-md py-2'>
             <img src='instagram.png' alt="" className='w-8 h-8' />
             <span className='text-2xl font-semibold text-[#2B6EA0]'>ConnectMe</span>
          </div>
  
          <div className='flex items-center gap-x-5 px-3 py-2 hover:bg-gray-100 hover:text-black  rounded-md' onClick={()=>{ navigate("/home")}}>
             <img src='home.png' alt="" className='w-6 h-6 ' />
             <span>Home</span>
          </div>
         
        <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 hover:text-black rounded-md' onClick={()=> { navigate("/profile")}}>
          <img src='user.png' alt="" className='w-6 h-6 ' />
          <span>Profile</span>
        </div>

        <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 hover:text-black rounded-md'>
          <img src='search.png' alt="" className='w-6 h-6 ' />
          <span>Search</span>
        </div>

        <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 hover:text-black rounded-md'>
          <img src='reels.png' alt="" className='w-6 h-6 ' />
          <span>Stories</span>
        </div>

        <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 hover:text-black rounded-md' onClick={()=>{ navigate("/chatbox")}}>
          <img src='chat.png' alt="" className='w-6 h-6 ' />
          <span>Message</span>
        </div>

        <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 hover:text-black rounded-md'>
          <img src='heart.png' alt="" className='w-6 h-6 ' />
          <span>Instructions</span>
        </div>

        <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100  hover:text-black rounded-md'>
          <img src='store.png' alt="" className='w-6 h-6 ' />
          <span>Store</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 cursor-pointer w-full">
        <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 hover:text-black  rounded-md'>
          <img src='settings.png' alt="" className='w-6 h-6 ' />
          <span>Settings</span>
        </div>

        <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100  hover:text-black rounded-md'>
          <img src='exit.png' alt="" className='w-6 h-6 ' />
          <span>Logout</span>
        </div>
      </div>

    </div>
  )
}

export default Iconswithname
