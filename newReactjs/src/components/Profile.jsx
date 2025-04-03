import React, { useEffect, useState } from 'react'
import Chatbox from './Chatbox'
import { useNavigate, useParams } from 'react-router-dom'
import Iconswithname from './Iconswithname'
import axios from 'axios'

const Profile = () => {
  const { userID } = useParams()
  console.log(userID)
  const navigate=useNavigate()
  const [profiledata,setProfileData]=useState({})
  const [post,setPost]=useState([])
  const [comments,setComments]=useState([])

  useEffect(()=>{
    const fetchdata=async()=>{
      let res;
      if(userID){
        res=await axios.get(`/api/user/getuser/${userID}`)
        console.log(res.data.data)
      }else{
        res=await axios.get('/api/user/getUserProfile');
        console.log(res.data.data)
      }
      const posts=await axios.get(`/api/post/getuserAllpost/${res.data.data._id}`)
      console.log(posts)
      setPost(posts.data.data)
      setProfileData(res.data.data)
      const commentid = await Promise.all(
        posts.data.data.map(async (post) => {
          const comment = await axios.get(`/api/post/getallcomment/${post._id}`)
          return comment.data
        })
      )
      const flattenedComments = commentid.flat().map(comment => comment.data).flat()
      setComments(flattenedComments)
      console.log(flattenedComments)
    }
    fetchdata()
  },[])


  return (
    <div className='w-screen h-screen  flex'>
      
    <Iconswithname />
    <div className='w-screen h-screen'>
         
            <div className='gradient flex items-center justify-center gap-2 px-6 pt-20 pb-20 w-auto h-auto border-b-2 border-gray-300'>

              <div id="inner" className='flex gap-14 items-center'>
                <div className='w-44 h-44 rounded-full overflow-hidden'>
                    <img src={profiledata.profilePhoto} alt="" className='object-cover w-full h-full'/>
                </div>

                <div className='flex flex-col gap-y-4'>

              <div className='flex gap-5 items-center'>
                <h2 className='font-semibold'>{profiledata.username}</h2>
               {!userID&&( <button className='editProfile text-white bg-blue-900 px-5 py-2 rounded-md' onClick={()=>{ navigate("/editprofile")}}>Edit profile</button>)}
              </div>

                  <div className='flex gap-24'>
                    <div>
                        <h2 className='text-gray-500'>posts</h2>
                        <h1 className='font-semibold'>{post?.length}</h1>
                    </div>
                    <div>
                        <h2 className='text-gray-500'>followers</h2>
                        <h1 className='font-semibold'>{profiledata.followers?.length}</h1>
                    </div>
                    <div>
                        <h2 className='text-gray-500'>following</h2>
                        <h1 className='font-semibold'>{profiledata.following?.length}</h1>
                    </div>
                  </div>

                <div>
                  <h1 className='font-semibold'>{profiledata.fullname}</h1>
                  <p>{profiledata.bio}</p>
                </div>


              </div>


            </div>

        
            </div>
        
        <div className='flex gap-16 pt-3 justify-center'>
          <div className='flex gap-2 items-center font-semibold'>
            <img src="profile.png" alt=""  className='w-5 h-5'/>
            <h3>POSTS</h3>
          </div>
          <div className='flex gap-2 items-center font-semibold'>
            <img src="reels.png" alt=""  className='w-5 h-5'/>
            <h3>SAVED</h3>
          </div>
        </div>

        <div id="posts" className='grid grid-cols-3 gap-4 p-6'>
      {Array.isArray(post) && post.length > 0 ? (
      post.map((p, index) => (
      <div key={index} className='relative'>
        <img
          src={p.photo} 
          alt="Post"
          className='w-full h-full object-cover rounded-lg shadow-md'
        />
      </div>
    ))
  ) : (
    <div>No posts available</div>
  )}
</div>
    </div>
    </div>
  )
}

export default Profile
