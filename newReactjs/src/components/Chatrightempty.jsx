import React from 'react'
import chat from '../assets/chat.png'

const Chatrightempty = () => {
  return (
    <div className='font-sans flex justify-center items-center flex-col gap-3 w-full h-full'>
        <div className='w-[85px] h-[85px] border-2 border-[#4e8cba] rounded-full flex justify-center items-center'>
           <img src={chat} alt="" className='w-8 h-8' />        
        </div>
        <h2 className='text-xl text-center'>Start your chat</h2>
        <p className='text-gray-500 text-center'>Send private photos and messages to a friend or group</p>
        <button className=' px-4 py-2 bg-[#2B6EA0] rounded-lg text-white hover:bg-[#265e89]'>Send message</button>
    </div>
  )
} 

export default Chatrightempty