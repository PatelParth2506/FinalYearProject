import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Photo = () => {
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('emptyuser2.jpeg');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setImageUrl(URL.createObjectURL(event.target.files[0]));
  };

  const handleImageClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className='w-full min-h-screen bgimage2 flex justify-center items-center p-4'>
      <div className="w-full max-w-[320px] bg-white rounded-3xl shadow-lg p-6 sm:p-8 flex flex-col items-center">
        <h1 id="signInText" className='font-bold text-2xl text-center'>Edit profile photo</h1>
        <div className='w-full flex justify-center items-center my-6'>
          <img src={imageUrl} alt="" className='w-40 h-40 sm:w-48 sm:h-48 object-cover border-4 border-blue-950 rounded-full cursor-pointer' onClick={handleImageClick} />
        </div>
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button onClick={() => {
          localStorage.setItem("profilePicture", imageUrl)

          setTimeout(() => {
            navigate("/loader")

            setTimeout(() => {
              navigate("/profilelayout")
            }, 4000)
          }, 1000);

        }
        } className="loginButton text-base sm:text-lg hover:bg-blue-700 text-white py-3 rounded-lg mt-4 w-full transition duration-300 font-extrabold">
          Save
        </button>
      </div>
    </div>
  );
};

export default Photo;


