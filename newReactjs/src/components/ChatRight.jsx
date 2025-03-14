import React from 'react';
import ChatLeft from './ChatLeft';
import { useLocation } from 'react-router-dom';

const ChatRight = () => {
  const location = useLocation();
  const { followerData, userData, followers } = location.state || {};

  return (
    <div className='flex'>
      <ChatLeft userData={userData} followers={followers} />

      <div className='w-screen'>
        {followerData ? (
          <div className='flex items-center gap-2 border-b-2 px-6 py-3'>
            <div className='w-16 h-16 rounded-full overflow-hidden'>
              <img src={followerData.profilePhoto} alt="" className='object-cover w-full h-full' />
            </div>
            <h2 className='font-semibold'>{followerData.username}</h2>
          </div>
        ) : (
          <div className='flex items-center gap-2 border-b-2 px-6 py-3'>
            <p>No follower data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRight;