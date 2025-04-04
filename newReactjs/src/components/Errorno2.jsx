import React from 'react'

const Errorno2 = () => {
  return (
    <div className='font-sans fixed top-5 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 z-50'>
    <div className='w-full border-2 border-red-600 bg-white text-red-600 rounded-md shadow-md py-3 px-6'>
       <p className="text-center text-sm sm:text-base">
         Username can contains only Alphabates [a-z or A-Z], digits and underscore only.
         Username length should be minimum 5 and maximum 18 characters.
       </p>
    </div>
    </div>
  )
}

export default Errorno2
