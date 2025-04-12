import React from 'react';
import { useNavigate } from 'react-router-dom';
import home from '../assets/home.png'

const ChatLeft = ({ userData, followers = [], openProfile }) => {
  const navigate=useNavigate()
  return (
    <div className='flex'>
      <div className='w-16 h-screen bg-white flex items-center flex-col gap-y-7 py-5 pt-8 border-r-2 border-gray-300'>
        <img src="instagram.png" alt="" className='w-8 h-8 cursor-pointer' />
        <br></br>
        <img src={home} alt="" className='w-6 h-6 cursor-pointer' onClick={()=>navigate('/home')}/>
        <img src="search.png" alt="" className='w-6 h-6 cursor-pointer' />
        <img src="clapper.png" alt="" className='w-6 h-6 cursor-pointer' />
        <img src="chat.png" alt="" className='w-6 h-6 cursor-pointer' />
        <img src="love.png" alt="" className='w-6 h-6 cursor-pointer' />
        <img src="profile.png" alt="" className='w-6 h-6 cursor-pointer' onClick={()=>navigate('/profilelayout/')} />
        <img src="settings.png" alt="" className='w-6 h-6 cursor-pointer' />
      </div>

      <div className='w-[450px] h-screen px-7 py-8 border-r-2 border-gray-300 overflow-y-hidden'>
        <div className='flex justify-between'>
          <h1 className='font-bold text-xl'>{userData?.username}</h1>
          <img src="edit.png" alt="" className='w-6 h-6 cursor-pointer' />
        </div>

        <div className='flex bg-transparent w-full justify-between pt-10 pb-3'>
          <h3 className='font-bold'>Messages</h3>
          <p className='text-slate-500 font-semibold cursor-pointer'>Requests</p>
        </div>

        <div className='h-[80vh] overflow-y-scroll'>
          <div className='flex flex-col gap-y-3 '>
            {followers.map((f) => (
              <div key={f._id} onClick={() => openProfile(f)} className='flex gap-3 items-center'>
                <div className='w-16 h-16 rounded-full overflow-hidden'>
                  <img src={f.profilePhoto} alt={f.username} className='object-cover w-full h-full' />
                </div>
                <div>
                  <h2 className='font-normal'>{f.username}</h2>
                  <p className='text-gray-500'>You have sent an attachment. <span>1 hour</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLeft;