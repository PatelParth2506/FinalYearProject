import React from 'react'
import Iconswithname from './Iconswithname'

const Editprofile = () => {
  return (
    <div className='flex'>
       <Iconswithname />

       <div className='w-screen h-screen p-10 flex flex-col justify-center items-center'>
           <h1 className='text-2xl font-bold'>Edit profile</h1>


        <div className='flex items-center flex-col gap-3  py-10'>
           <div className='w-20 h-20 rounded-full overflow-hidden'>
               <img src="man2.jpg" alt="" className='w-full h-full object-cover'/>     
           </div>

           <h2 className='text-lg font-semibold text-blue-900'>Edit picture or profile</h2>
        </div>


    <div className='flex flex-col gap-5'>
      <div className='relative'>
        <input type="text" className="px-4 pt-6 pb-2 w-[400px] rounded-md bg-transparent border-[1px] border-gray-400"/>
        <span className='absolute top-1 left-4 text-gray-500'>Name</span>
      </div>

      <div className='relative'>
        <input type="text" className="px-4 pt-6 pb-2 w-[400px] rounded-md bg-transparent border-[1px] border-gray-400"/>
        <span className='absolute top-1 left-4 text-gray-500'>Username</span>
      </div>
 
      <div className='relative'>
        <input type="text" className="px-4 pt-6 pb-2 w-[400px] rounded-md bg-transparent border-[1px] border-gray-400"/>
        <span className='absolute top-1 left-4 text-gray-500'>Bio</span>
      </div>

      <div className='relative'>
        <select className='px-4 pt-7 pb-2 w-[400px] rounded-md  bg-transparent border-[1px] border-gray-400'>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Custom">Custom</option>
            <option value="Not">Prefer not to say</option>
        </select>
        <span className='absolute top-1 left-4 text-gray-500'>Gender</span>
      </div>

        <input className='savechange text-white px-4 py-4 rounded-md text-xl font-bold' type="submit" value="Save" />
    </div>
        
       </div>


    </div>
  )
}

export default Editprofile
