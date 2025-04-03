import React from 'react'
import { useNavigate } from 'react-router-dom'

const Iconswithname = () => {

  const navigate = useNavigate();

  return (

    <div className='bg-slate-950 text-gray-100 overFlow loginForm font-sans w-[220px] h-[93vh] py-8 px-2 flex flex-col gap-y-7 justify-between items-start z-5 fixed sm:static md:relative overflow-auto'>

      <div className='w-full flex flex-col cursor-pointer flex-2 justify-between gap-2'>
        <div className='flex items-center gap-x-5 px-3 py-2 hover:bg-gray-100 hover:text-black rounded-md' onClick={() => { navigate("/home") }}>
          <img src="home.png" alt="" className='w-6 h-6 ' />
          <span>Home</span>
        </div>

        <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 hover:text-black rounded-md' onClick={() => { navigate("/profilelayout") }}>
          <img src="user.png" alt="" className='w-6 h-6 ' />
          <span>Profile</span>
        </div>

        <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 hover:text-black rounded-md'>
          <img src="search.png" alt="" className='w-6 h-6 ' />
          <span>Search</span>
        </div>

        <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 hover:text-black rounded-md'>
          <img src="reels.png" alt="" className='w-6 h-6 ' />
          <span>Stories</span>
        </div>

        <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 hover:text-black rounded-md' onClick={() => { navigate("/chatbox") }}>
          <img src="chat.png" alt="" className='w-6 h-6 ' />
          <span>Message</span>
        </div>

        <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 hover:text-black rounded-md'>
          <img src="love.png" alt="" className='w-6 h-6 ' />
          <span>Instructions</span>
        </div>

        <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 hover:text-black rounded-md'>
          <img src="bookmark.png" alt="" className='w-6 h-6 ' />
          <span>Bookmarks</span>
        </div>

        <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 hover:text-black rounded-md'>
          <img src="store.png" alt="" className='w-6 h-6 ' />
          <span>Store</span>
        </div>

      </div>

      <div className="w-full flex flex-1 items-end">
        <div className="w-full flex flex-col cursor-pointer gap-2">
          <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 hover:text-black rounded-md'>
            <img src="settings.png" alt="" className='w-6 h-6 ' />
            <span>Settings</span>
          </div>

          <div className='flex items-center gap-x-5 py-2 px-3 hover:bg-gray-100 hover:text-black rounded-md'>
            <img src="exit.png" alt="" className='w-6 h-6 ' />
            <span>Logout</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Iconswithname
