import React from 'react'
import home from '../assets/img/stories/home.png'
import search from '../assets/img/stories/search.png'
import chat from '../assets/img/stories/chat.png'
import user from '../assets/img/stories/user.png'
import love from '../assets/img/stories/love.png'
import reels from '../assets/img/stories/reels.png'
import bookmark from '../assets/img/stories/bookmark.png'
import store from '../assets/img/stories/store.png'
import settings from '../assets/img/stories/settings.png'
import exit from '../assets/img/stories/exit.png'

function LeftMenuIcon() {
  return (
    <div className='loginForm w-[60px] h-[93vh] flex justify-between flex-col items-center py-8 bg-white fixed z-6 md:relative'>

      <div className='flex flex-col items-center flex-2 justify-between'>
        <img src={home} alt="" className='w-6 h-6'/>

        <img src={user} alt="" className='w-6 h-6'/>

        <img src={search} alt="" className='w-6 h-6'/>

        <img src={reels} alt="" className='w-6 h-6'/>

        <img src={chat} alt="" className='w-6 h-6'/>
        
        <img src={love} alt="" className='w-6 h-6'/>

        <img src={bookmark} alt="" className='w-6 h-6'/>

        <img src={store} alt="" className='w-6 h-6'/>
      </div>

      <div className="flex flex-col gap-y-8 items-center flex-1 justify-end">
          <img src={settings} alt="" className='w-6 h-6 ' />

          <img src={exit} alt="" className='w-6 h-6 ' />
      </div>

    </div>
  )
}

export default LeftMenuIcon