import React, { useEffect, useState } from 'react';
import ChatLeft from './ChatLeft';
import { useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';

const ChatRight = () => {
  const location = useLocation();
  const { followerData, userData, followers } = location.state || {};
  console.log(followerData)
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [selectedMessageId,setSelectedMessageId]=useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const newSocket = io('http://localhost:8000', {
      withCredentials: true,
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit('addUser', userData._id);
      socket.on('getMessage', (data) => {
        setMessages((prev) => [...prev, data]);
      });
    }
  }, [socket, userData]);

  useEffect(()=>{
    const fetchmessage=async()=>{
      try {
        const res=await axios.get(`/api/message/getmessage/${followerData._id}`)
        setMessages(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    if(userData?._id && followerData?._id){
      fetchmessage()
    }
  },[userData,followerData])

  const handleSendMessage = async () => {
    const receiverId = followerData._id;
    console.log(receiverId);
    const message = {
      senderId: userData._id,
      receiverId,
      text: newMessage,
    };

    try {
      const res = await axios.post(`/api/message/sendmessage/${receiverId}`, {text:newMessage, sender:userData._id, receiver:receiverId}, {
        withCredentials: true
      });
      console.log(res);
      setMessages((prev) => [...prev, res.data.data]);
      socket.emit('sendMessage', message);
      setNewMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await axios.delete(`/api/message/deletemessage/${messageId}`, {
        withCredentials: true
      });
      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
      setSelectedMessageId(null)
    } catch (error) {
      console.error(error);
    }
  };

  const handleMessageClick=(messageID)=>{
    setSelectedMessageId((prev)=>(prev === messageID ? null : messageID))
  }

  const openProfile = (f) => {
    console.log(f)
    navigate("/chatrightpart", { state: { followerData:f, userData, followers } });
  };
  return (
    <div className='flex'>
      <ChatLeft userData={userData} followers={followers} openProfile={openProfile}/>

      <div className='w-screen flex flex-col'>
        {followerData ? (
          <div className='flex items-center gap-2 border-b-2 px-6 py-3'>
            <div className='w-16 h-16 rounded-full overflow-hidden'>
              <img src={followerData.profilePhoto} alt="" className='object-cover w-full h-full' />
            </div>
            <h2 className='font-semibold'>{followerData.username}</h2>
          </div>
        ) : (
          <div className='flex items-center gap-2 border-b-2 px-6 py-3'>
            <p>No follower data available</p>
          </div>
        )}

        <div className='flex-grow overflow-y-scroll p-4'>
          {messages.map((msg) => (
            
            <div
              key={msg._id}
              className={`p-2 my-2 rounded-lg max-w-xs ${
                msg.sender === userData._id ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-200 text-black self-start mr-auto'
              }`}
             onClick={()=>handleMessageClick(msg._id)}>
              {msg.text}
              {selectedMessageId === msg._id && msg.sender === userData._id && (
                <button
                  onClick={() => handleDeleteMessage(msg._id)}
                  className='ml-2 text-red-500'
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>

        <div className='input flex items-center border-t-2 px-6 py-3 sticky bottom-0'>
          <input
            type='text'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key === 'Enter'){
                handleSendMessage()
              }
            }}
            placeholder='Type a message...'
            className='flex-grow px-4 py-2 border rounded-md'
          />
          <button onClick={handleSendMessage} className='ml-4 px-4 py-2 bg-blue-500 text-white rounded-md'>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRight;