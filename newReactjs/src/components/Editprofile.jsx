import React, { useState } from 'react'
import Iconswithname from './Iconswithname'
import { useNavigate } from 'react-router-dom';

const Editprofile = () => {

  const [bio, setBio] = useState("");

  const navigate = useNavigate()

  return (
    <div className='flex'>
       <Iconswithname />

       <div className='bgimage2 w-screen h-screen p-10 flex flex-col justify-center items-center '>
       <div className='relative w-auto h-auto bg-white p-6 rounded-3xl loginForm'>
       <h1 className='absolute top-[-25px] text-2xl font-medium bg-sky-200 px-14 py-2 rounded-lg text-blue-950'>Edit profile</h1>


       <div className='flex items-center flex-col gap-3 py-5'>
           <div className='w-20 h-20 rounded-full overflow-hidden'>
               <img src="man2.jpg" alt="" className='w-full h-full object-cover'/>     
           </div>
           <h2 className='text-lg font-semibold text-blue-900' onClick={()=>{ navigate("/photo")  }}>Edit picture or profile</h2>
        </div>

    <div className='flex flex-col gap-5'>
      <div className='relative'>
        <input type="text" className="px-4 pt-6 pb-2 w-[400px] rounded-md bg-transparent border-[1px] border-gray-400"/>
        <label className='absolute top-1 left-4 text-gray-500'>Name</label>
      </div>

      <div className='relative'>
        <input type="text" className="px-4 pt-6 pb-2 w-[400px] rounded-md bg-transparent border-[1px] border-gray-400"/>
        <label className='absolute top-1 left-4 text-gray-500'>Username</label>
      </div>
 
      <div className='relative'>
      <textarea maxLength={150}
        type="text" className="resize-none px-4 pt-6 pb-2 w-[400px] rounded-md bg-transparent border-[1px] border-gray-400" style={{scrollbarWidth: 'none',msOverflowStyle: 'none'}}/>
     <p className="text-gray-500 text-sm absolute top-1 z-20 right-3">{bio.length} / 150</p>

     <label className='w-[380px] absolute top-1 left-4 z-10 text-gray-500 bg-white'>Bio</label>
     </div>

     <div className='relative'>
        <select className='px-4 pt-7 pb-2 w-[400px] rounded-md  bg-transparent border-[1px] border-gray-400'>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Custom">Custom</option>
            <option value="Not">Prefer not to say</option>
        </select>
        <label className='absolute top-1 left-4 text-gray-500'>Gender</label>
      </div>



        <input className='savechange text-white px-4 py-4 rounded-md text-xl font-bold' type="submit" value="Save" />
           </div>    
         </div>
       </div>
    </div>
  )
}

export default Editprofile
