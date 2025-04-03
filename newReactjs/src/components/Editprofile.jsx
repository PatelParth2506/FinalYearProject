import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Editprofile = () => {
  const [bio, setBio] = useState("");
  const navigate = useNavigate();

  return (
    <div className='font-sans bgimage2 w-full h-full flex flex-col justify-center items-center p-6 md:p-6 '>
      <div className='relative w-full max-w-sm md:max-w-sm lg:max-w-md bg-white p-5 md:p-6 rounded-2xl shadow-lg'>
        <h1 className='absolute top-[-18px] text-lg md:text-xl bg-sky-200 px-6 py-2 rounded-lg text-blue-950 font-bold'>Edit profile</h1>
        
        <div className='flex flex-col items-center gap-3 py-4'>
          <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden'>
            <img src="man2.jpg" alt="Profile" className='w-full h-full object-cover' />
          </div>
          <h2 className='text-md font-medium text-blue-600 cursor-pointer' onClick={() => navigate("/photo")}>Edit picture or profile</h2>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='relative'>
            <input type="text" className="px-3 pt-5 pb-1 w-full rounded-md bg-transparent border border-gray-400 text-md" />
            <label className='absolute top-1 left-3 text-gray-500 text-sm'>Name</label>
          </div>

          <div className='relative'>
            <input type="text" className="px-3 pt-5 pb-1 w-full rounded-md bg-transparent border border-gray-400 text-md" />
            <label className='absolute top-1 left-3 text-gray-500 text-sm'>Username</label>
          </div>

          <div className='relative'>
            <textarea
              maxLength={150}
              className="resize-none px-3 pt-5 pb-1 w-full rounded-md bg-transparent border border-gray-400 text-md"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <p className="text-gray-500 text-sm absolute top-2 right-2">{bio.length} / 150</p>
            <label className='absolute top-1 left-3 text-gray-500 text-sm bg-white'>Bio</label>
          </div>

          <div className='relative'>
            <select className='px-3 pt-6 pb-1 w-full rounded-md bg-transparent border border-gray-400 text-md'>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Custom">Custom</option>
              <option value="Not">Prefer not to say</option>
            </select>
            <label className='absolute top-1 left-3 text-gray-500 text-sm'>Gender</label>
          </div>

          <input className='savechange text-white w-full px-3 py-2 rounded-md text-lg  hover:bg-blue-700 transition duration-300 font-bold' type="submit" value="Save" />
        </div>
      </div>
    </div>
  );
}

export default Editprofile;
