import React, { useEffect, useState } from 'react'
import Chatbox from './Chatbox'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import emptyuser2 from '../../emptyuser2.jpeg'
import profile from "../assets/profile.png"
import bookmark from "../assets/bookmark.png"

const Profile = ({ userID }) => {

  const navigate = useNavigate()
  const [profiledata, setProfileData] = useState({})
  const [post, setPost] = useState([])
  const [comments, setComments] = useState([])
  const [showFullBio, setShowFullBio] = useState(false)

  const [showUserList, setShowUserList] = useState(null) 
  const [userList, setUserList] = useState([])

  useEffect(() => {
    const fetchdata = async () => {
      let res
      if (userID) {
        res = await axios.get(`/api/user/getuser/${userID}`)
      } else {
        res = await axios.get('/api/user/getUserProfile')
      }

      const user = res.data.data
      setProfileData(user)

      const posts = await axios.get(`/api/post/getuserAllpost/${user._id}`)
      setPost(posts.data.data)

      const commentid = await Promise.all(
        posts.data.data.map(async (post) => {
          const comment = await axios.get(`/api/post/getallcomment/${post._id}`)
          return comment.data
        })
      )

      const flattenedComments = commentid.flat().map(comment => comment.data).flat()
      setComments(flattenedComments)
    }
    fetchdata()
  }, [])

  const handleShowUserList = async (type) => {
    setShowUserList(type)
    const userIds = profiledata[type] || []
    const users = await Promise.all(
      userIds.map(async (id) => {
        const res = await axios.get(`/api/user/getuser/${id}`)
        return res.data.data
      })
    )
    setUserList(users)
  }

  return (
    <div className="overFlow w-full min-h-screen flex flex-col bg-gradient-to-tr from-[#e0e7ff] via-[#fcf3f3] to-[#dbeafe]">
      <div className="overFlow w-full h-screen overflow-y-scroll">
        <div className="BgEdit bg-gradient-to-tr from-blue-300 to-purple-400  flex flex-col md:flex-row items-center justify-center gap-4 px-8 py-1 w-full h-auto md:h-[350px]">
          <div
            id="inner"
            className="flex flex-col md:flex-row gap-2 md:gap-10 items-center md:bg-slate-100 rounded-xl px-8 py-6 w-full md:w-[500px]"
          >
            <div className="md:ml-[-150px] w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-900 ">
              <img
                src={profiledata.profilePhoto || emptyuser2}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>

            <div className="max-h-80 flex flex-col gap-y-3 w-full md:w-[400px] overflow-y-auto">
              <div className="flex flex-col md:flex-row gap-4 md:gap-9 items-center">
                <h2 className="font-semibold">{profiledata.username}</h2>
                {!userID && (
                  <button
                    className="editProfile text-white hover:bg-blue-700 px-9 py-2 rounded-md bg-blue-500 transition duration-300"
                    onClick={() => navigate('/editprofilelayout')}
                  >
                    Edit profile
                  </button>
                )}

              </div>

<<<<<<< HEAD
              {/* Stats */}
              <div className="flex justify-center md:justify-start gap-8 md:gap-16">
  <div className="text-center">
    <h2 className="text-gray-900 font-normal text-sm md:text-base">Posts</h2>
    <h1 className="font-semibold text-base md:text-lg">{post?.length}</h1>
  </div>
  <div className="text-center">
    <h2 className="text-gray-900 font-normal text-sm md:text-base">Followers</h2>
    <h1 className="font-semibold text-base md:text-lg">{profiledata.followers?.length}</h1>
  </div>
  <div className="text-center">
    <h2 className="text-gray-900 font-normal text-sm md:text-base">Following</h2>
    <h1 className="font-semibold text-base md:text-lg">{profiledata.following?.length}</h1>
  </div>
</div>


              <div className="px-4 md:px-0">
  <h1 className="font-semibold text-lg md:text-xl">DISHANT</h1>

  <div className="mt-1 md:mt-2">
    {showFullBio ? (
      <p className="text-sm md:text-base whitespace-pre-wrap">{profiledata.bio}</p>
    ) : (
      <p className="text-sm md:text-base bio-text whitespace-pre-wrap line-clamp-2">{profiledata.bio}</p>
    )}

    <button
      className="mt-1 text-gray-500 text-sm md:text-base font-medium focus:outline-none"
      onClick={() => setShowFullBio(!showFullBio)}
    >
      {showFullBio ? 'Show less' : 'Read more'}
    </button>
  </div>
</div>



=======
              <div className="flex justify-center md:justify-start gap-16 md:gap-16">
                <div className="text-center">
                  <h2 className="text-gray-900 font-normal">Posts</h2>
                  <h1 className="font-semibold ">{post?.length}</h1>
                </div>
                <div className="text-center cursor-pointer" onClick={() => handleShowUserList('followers')}>
                  <h2 className="text-gray-500 font-semibold">Followers</h2>
                  <h1 className="font-semibold">{profiledata.followers?.length}</h1>
                </div>
                <div className="text-center cursor-pointer" onClick={() => handleShowUserList('following')}>
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
                  <button className="read-more-btn text-blue-500" onClick={() => setShowFullBio(!showFullBio)}>
                    {showFullBio ? 'Show less' : 'Read more'}
                  </button>
>>>>>>> becadbed5b366b53b64d6b3189bc3edb3c9072d9
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex gap-16 pt-3 justify-center'>
          <div className='flex gap-2 items-center font-semibold'>
            <img src={profile} alt="" className='w-5 h-5' />
            <h3 className='cursor-pointer'>POSTS</h3>
          </div>
          <div className='flex gap-2 items-center font-semibold'>
            <img src={bookmark} alt="" className='w-5 h-5' />
            <h3 className='cursor-pointer'>SAVED</h3>
          </div>
        </div>

        <div id="posts" className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6">
          {Array.isArray(post) && post.length > 0 ? (
            post.map((p, index) => (
              <div key={index} className="relative">
                <img
                  src={p.photo}
                  alt="Post"
                  onClick={() => navigate(`/getallpost/${profiledata._id}/${p._id}`)}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>
            ))
          ) : (
            <div>No posts available</div>
          )}
        </div>

        {showUserList && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-96 max-h-[80vh] overflow-y-auto rounded-lg p-4">
              <div className="flex justify-between items-center border-b pb-2 mb-2">
                <h2 className="text-xl font-semibold capitalize">{showUserList}</h2>
                <button onClick={() => setShowUserList(null)} className="text-red-500">Close</button>
              </div>
              {userList.map((user) => (
                <div key={user._id} className="flex items-center justify-between gap-3 py-2 border-b">
                  <div className="flex gap-3 items-center">
                    <img src={user.profilePhoto || emptyuser2} alt="user" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h3 className="font-semibold">{user.username}</h3>
                      <p className="text-sm text-gray-500">{user.fullname}</p>
                    </div>
                  </div>
                  {!userID && (
                    <button className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-sm">
                      {profiledata.following?.includes(user._id) ? 'Following' : 'Follow'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
