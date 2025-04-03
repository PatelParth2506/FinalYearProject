import React from 'react'

const Errorno3 = () => {
  return (
    <div className=' font-sans fixed top-5 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 z-50'>
    <div className='w-full border-2 border-red-600 bg-white text-red-600 rounded-md shadow-md py-3 px-6'>
       <p className="text-center text-sm sm:text-base">
          Password length should be between 6 and 14 characters.
       </p>
    </div>
    </div>
  )
}

export default Errorno3
