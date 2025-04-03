import axios from 'axios';
import React, { useEffect, useState } from 'react'
import dots from '../assets/dots.png'
import bookmark from '../assets/bookmark.png'
import bookmarked from '../assets/bookmarkFill.png'
import commentimg from '../assets/comments.png'
import herat from '../assets/heart.png'
import heratfill from '../assets/heartFill.png'
import send from '../assets/send.png'
import { useNavigate } from 'react-router-dom';


function Uploaded({ user }) {
    console.log(user)
    const [like, setLike] = useState(false);
    const [save, setSave] = useState(false);
    const [commentState, setCommentState] = useState({});
    const [posts, setPosts] = useState([])
    const [newComment, setNewComment] = useState('');

    const navigate = useNavigate()

    useEffect(() => {
        const fetchdata = async () => {
            const res = await axios.get('/api/post/getAllPost', {
                withCredentials: true
            })
            console.log(res.data.data)
            setPosts(res.data.data)
        }
        fetchdata()
    }, [])

    const toggleLike = async (postid) => {
        const like = await axios.post(`/api/post/likepost/${postid}`, {}, {
            withCredentials: true
        })
        console.log(like.data)
        setPosts((prev) => {
            return prev.map((p) => {
                if (p._id === postid) {
                    return like.data.data
                } else {
                    return p
                }
            })
        })
    }

    const handlesendComment = async (postid) => {
        console.log(postid)
        const addcom = await axios.post(`/api/post/addcomment/${postid}`, {
            comment: newComment
        }, {
            withCredentials: true
        })
        console.log(addcom.data)
        setNewComment('')

        setCommentState((prev) => ({
            ...prev,
            [postid]: true
        }))
        setTimeout(() => {
            setCommentState((prev) => ({
                ...prev,
                [postid]: false
            }))
        }, 1000)
    }

    const toggleComment = (postid) => {
        setCommentState((prev) => ({
            ...prev,
            [postid]: !prev[postid]
        }))
    }

    const gotoProfile = async (userID) => {
        navigate(`/profile/${userID}`)
    }

    const toggolefollow = async (userID) => {
        try {
            const res = await axios.post(`/api/user/togglefollow/${userID}`, {
                withCredentials: true
            })
            if (user.following.includes(userID)) {
                user.following = user.following.filter((id) => id !== userID)
            } else {
                user.following.push(userID)
            }
            setPosts((prev) => [...prev])
        } catch (error) {
            console.log(error)
        }
    }

    return (
        posts.map((post) => {
            const hasLiked = post.likes.includes(user._id)
            const commentOpen = commentState[post._id] || false;
            return (
                <div className='w-full h-fit pt-5 px-2 font-sans sm:px-6 md:px-8'>
                    <div className="flex items-center justify-between px-5">
                        <div className="flex justify-start items-center gap-x-3 cursor-pointer">
                            <img src={post.owner.profilePhoto} alt="userPro" className='w-12 h-12 rounded-full' onClick={() => gotoProfile(post.owner._id)} />
                            <div className="flex justify-center items-start flex-col" onClick={() => gotoProfile(post.owner._id)}>
                                <p className="text-[#2B6EA0] text-[16px] font-semibold">{post.owner.username}</p>
                                <p className="text-gray-500 text-sm">{user.fullname ?? "hello"}</p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="px-7 py-2 ml-2 border border-2xl border-[#2B6EA0] text-[#2B6EA0] text-[16px] rounded-2xl">
                                <button onClick={() => toggolefollow(post.owner._id)}>{user.following.includes(post.owner._id) ? "Following" : "Follow"}</button>
                            </div>
                        </div>
                    </div>


                    <div className="w-full h-[350px] flex justify-center items-center mt-3 sm:h-[420px]">
                        <div className="h-full w-full mx-5 p-1">
                            <img src={post.photo} alt="post" className='w-full h-full rounded-2xl' />
                        </div>
                    </div>

                    <div className="w-full flex justify-between items-center mt-3 px-5">
                        <div className="flex gap-x-4">
                            <div className="flex items-center justify-center gap-x-2">
                                <img src={hasLiked ? heratfill : herat} onClick={() => toggleLike(post._id)} alt="heart" className="cursor-pointer" />
                                <p className="text-l text-gray-600"><b>{post.likes.length}</b></p>
                            </div>
                            <div className="flex items-center justify-center gap-x-2">
                                <img src={commentimg} alt="comments" className="cursor-pointer" onClick={() => toggleComment(post._id)} />
                                <p className="text-l text-gray-600"><b>{post.comments.length}</b></p>

                            </div>
                            <img src={send} alt="send" />
                        </div>
                        <img src={save ? bookmarked : bookmark} alt="bookmark" className="cursor-pointer" onClick={() => setSave(pre => !pre)} />
                    </div>


                    {commentOpen && (
                        <div className="w-full px-5 mt-3">
                            <div className="w-full px-3 py-3 flex flex-col gap-y-3 bg-gray-100 rounded-xl">
                                <div className="w-full flex flex-col gap-y-1 max-h-40 overflow-y-auto">
                                    {/* Dynamically render comments */}
                                    {post.comments && post.comments.length > 0 ? (
                                        post.comments.map((c, index) => (
                                            <p key={index} className="text-[15px] text-gray-800 max-w-full h-fit flex justify-between flex-col">
                                                <span className="text-[#2B6EA0]">{c.commentby.username}</span> {c.comment}
                                            </p>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-sm">No comments yet.</p>
                                    )}
                                </div>
                                <div className="flex gap-x-2 items-center">
                                    <div className="w-full">
                                        <input
                                            type="text"
                                            placeholder="Add a comment..."
                                            className="w-full border-1 border-[#2B6EA0] px-2 py-1 rounded outline-none"
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                        />
                                    </div>
                                    <button className="msgBtn text-white text-[13px] px-5 py-2 rounded" onClick={() => handlesendComment(post._id)}>Send</button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="px-6 mt-2">
                        <p className="text-gray-700">{post.description}</p>
                    </div>

                    <div className='px-5 pt-5'>
                        <div className="w-full h-px bg-[#2B6EA0]"></div>
                    </div>
                </div>)
        })

    )
}

export default Uploaded