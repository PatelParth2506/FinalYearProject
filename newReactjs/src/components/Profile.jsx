import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import profile from '../assets/profile.png'
import reels from '../assets/reels.png'


const Profile = ({userID}) => {
  console.log(userID)
  const navigate=useNavigate()
  const [profiledata,setProfileData]=useState({})
  const [post,setPost]=useState([])
  const [comments,setComments]=useState([])

  const [showFullBio, setShowFullBio] = useState(false);


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
    <div className='overFlow w-full h-screen  flex'>
      
    <div className='overFlow w-full h-screen overflow-y-scroll'>
         
            <div className='bgEdit flex items-center justify-center gap-2 px-8 py-14 w-full h-[350px] '>

              <div id="inner" className=' flex gap-10 items-center  bg-slate-100  rounded-xl px-8 py-6 w-[500px] '>
                <div className='ml-[-150px] w-48 h-44 rounded-full overflow-hidden border-4 border-slate-100'>
                    <img src={profiledata.profilePhoto} alt="" className='object-cover w-full h-full'/>
                </div>

                <div className='max-h-80 flex flex-col gap-y-3 w-[400px] overflow-y-auto'>

              <div className='flex gap-9 items-center'>
                <h2 className='font-semibold'>{profiledata.username}</h2>
                {!userID && (<button className='editProfile text-white bg-blue-500 px-5 py-2 rounded-md ' onClick={()=>{ navigate("/editprofile")}}>Edit profile</button>)}  
              </div>

      {/* Stats */}
      <div className="flex justify-center md:justify-start gap-16">
        <div className="text-center">
          <h2 className="text-gray-500 font-semibold">Posts</h2>
          <h1 className="font-semibold">{post?.length}</h1>
        </div>
        <div className="text-center">
          <h2 className="text-gray-500 font-semibold">Followers</h2>
          <h1 className="font-semibold">{profiledata.followers?.length}</h1>
        </div>
        <div className="text-center">
          <h2 className="text-gray-500 font-semibold">Following</h2>
          <h1 className="font-semibold">{profiledata.following?.length}</h1>
        </div>
      </div>

                <div>
                  <h1 className='font-semibold'>{profiledata.fullname}</h1>

                  <div>
                          {showFullBio ? (
                             <p>{profiledata.bio}</p>
                            ) : (
                              <p className="bio-text whitespace-pre-wrap">{profiledata.bio}</p>
                            )}

                         <button className="read-more-btn" onClick={() => setShowFullBio(!showFullBio)}>
                         {showFullBio ? 'Show less' : 'Read more'}
                          </button>
                      </div>
                    </div>
                </div>
              </div>
            </div>


    
        <div className='flex gap-16 pt-3 justify-center'>
          <div className='flex gap-2 items-center font-semibold'>
            <img src={profile} alt=""  className='w-5 h-5'/>
            <h3 className='cursor-pointer'>POSTS</h3>
            </div>
          <div className='flex gap-2 items-center font-semibold'>
            <img src={reels} alt=""  className='w-5 h-5'/>
            <h3 className='cursor-pointer'>SAVED</h3>
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
