import React from 'react'

const Chatrightempty = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center flex-col gap-3'>
        <div className='w-[85px] h-[85px] border-2 border-gray-500 rounded-full flex justify-center items-center'>
           <img src="chat.png" alt="" className='w-10 h-10' />        
        </div>
        <h2 className='text-xl'>Start your chat</h2>
        <p className='text-gray-500'>Send private photos and messages to a friend or group</p>
        <button className='msgBtn px-4 py-2 bg-red-300 rounded-lg text-white'>Send message</button>
    </div>
  )
}

export default Chatrightempty

