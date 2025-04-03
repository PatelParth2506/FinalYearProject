import React from 'react'

const Success = () => {
  return (
    <div className='fixed top-5 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 z-50'>
    <div className='w-full border-2 border-green-600 bg-white text-green-600 rounded-md shadow-md py-3 px-6'>
       <p className='text-center text-sm sm:text-base'>You have successfully created an account. Explore it!</p>
    </div>
    </div>
  )
}

export default Success
