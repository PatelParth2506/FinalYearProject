import React from 'react'

const Errorno2 = () => {
  return (
    <div className='w-screen flex justify-center items-center mt-12'>
    <div className='w-[400px] h-auto border-[2px] border-red-600 text-red-600 rounded-md shadow-md py-4 px-3 bg-white'>
       <p>
         Username can contains only Alphabates [a-z or A-Z], digits and underscore only.
         Username length should be minimum 5 and maximum 18 characters.
       </p>
    </div>
    </div>
  )
}

export default Errorno2
