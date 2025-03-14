import React from 'react'

const Home = () => {
  const handleLogout = () => {
    localStorage.removeItem("a")

    window.location.href="/login"
  }
  return (
    <div className='p-5'>
      <h1 className='text-5xl'>Welcome to Home page</h1>
     <br/>
      <button onClick={handleLogout} className='bg-pink-700 text-white px-12 py-3'>Logout</button>
    </div>
  )
}

export default Home
