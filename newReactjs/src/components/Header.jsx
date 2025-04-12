import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ setActivePage,user }) {
  const navigate = useNavigate();
  return (
    <div className='w-full h-full bg-gray-900 flex justify-between px-10 items-center pt-2'>
        <h1 className='text-xl text-white'>Hello <br /> <span className='text-3xl font-bold'>{user.username}</span> </h1>
        <div className="space-x-3">
          <button className='px-5 py-1 border-2 border-white text-white rounded-2xl' onClick={() => setActivePage("AddProduct")}>Add</button>
          <button className='px-5 py-1 border-2 border-white text-white rounded-2xl' onClick={() => setActivePage("AdminPage")}>See</button>
          <button className='px-5 py-2 bg-white text-gray-900 rounded-full' onClick={()=>navigate("/home")}>Back</button>
        </div>
    </div>
  );
}

export default Header;
