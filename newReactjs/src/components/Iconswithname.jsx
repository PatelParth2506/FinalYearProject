import React from 'react'
import { useNavigate } from 'react-router-dom'

const Iconswithname = () => {

    const navigate = useNavigate();
    
  return (
    <div className='w-[250px] h-screen bg-white flex px-3 py-8 flex-col gap-y-7  border-r-2 border-gray-300'>
         <img src="instagram.png" alt="" className='w-8 h-8 ml-3' /> 
         <br></br>    

         <div className='flex flex-col gap-4 cursor-pointer'>
          <div className='flex items-center gap-x-5 px-3 py-2 hover:bg-gray-100 rounded-md' onClick={()=>{ navigate("/home")}}>
            <img src="home.png" alt="" className='w-6 h-6 ' />
            <span>Home</span>
          </div>
          
          <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 rounded-md'>
            <img src="search.png" alt="" className='w-6 h-6 ' />
            <span>Search</span>
          </div>

          <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 rounded-md' onClick={()=>{ navigate("/chatbox")}}>
            <img src="chat.png" alt="" className='w-6 h-6 ' />
            <span>Message</span>
          </div>
          <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 rounded-md'>
            <img src="love.png" alt="" className='w-6 h-6 ' />
            <span>Instructions</span>
          </div>


          <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 rounded-md' onClick={()=> { navigate("/profile")}}>
            <img src="profile.png" alt="" className='w-6 h-6 ' />
            <span>Profile</span>
          </div>
          <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 rounded-md'>
            <img src="settings.png" alt="" className='w-6 h-6 ' />
            <span>Settings</span>
          </div>
        </div>

    </div>
  )
}

export default Iconswithname
