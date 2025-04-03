// import axios from 'axios';
// import React, { useState } from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';

// const Photo = () => {
//   const navigate = useNavigate()
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState('emptyuser2.jpeg');

//   const handleFileChange = async(event) => {
//     const file=event.target.files[0];
//     setSelectedFile(file);
//     setImageUrl(URL.createObjectURL(event.target.files[0]));
//     const formData = new FormData();
//     formData.append("profilePhotopath",file)
//     try {
//       const res = await axios.post(`/api/user/profilePhotochange`, formData, {
//           headers: {
//               "Content-Type": "multipart/form-data",
//           },
//       });
//       console.log("Profile photo updated:", res.data);
//   } catch (error) {
//       console.error("Error updating profile photo:", error);
//   }

//   const handleImageClick = () => {
//     document.getElementById('fileInput').click();
//   };

//   return (
//     <div className='w-full min-h-screen bgimage2 flex justify-center items-center p-4'>
// <div className="w-full max-w-[320px] bg-white rounded-3xl shadow-lg p-6 sm:p-8 flex flex-col items-center">
// <h1 id="signInText" className='font-bold text-2xl text-center'>Edit profile photo</h1>
//         <div className='w-full flex justify-center items-center my-6'>
//           <img src={imageUrl} alt="" className='w-40 h-40 sm:w-48 sm:h-48 object-cover border-4 border-blue-950 rounded-full cursor-pointer' onClick={handleImageClick} />
//         </div>
//         <input
//           type="file"
//           id="fileInput"
//           style={{ display: 'none' }}
//           onChange={handleFileChange}
//         />
//         <button onClick={()=> 
//           { 
//             localStorage.setItem("profilePicture",imageUrl)

//             setTimeout(() => {
//                navigate("/loader")

//                setTimeout(() => {
//                 navigate("/profile")
//                },4000)
//             },1000);
          
//           }
//           } className="loginButton text-base sm:text-lg hover:bg-blue-700 text-white py-3 rounded-lg mt-4 w-full transition duration-300 font-extrabold">
//         Save
//         </button>
//       </div>
//     </div>
//   );
// };
// }
// export default Photo;



import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Photo = () => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("emptyuser2.jpeg");
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setImageUrl(URL.createObjectURL(file));
    };

    const handleSave = async () => {
        if (!selectedFile) {
            alert("Please select a file before saving.");
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append("profilePhoto", selectedFile);

        try {
            const res = await axios.patch(`/api/user/profilePhotochange`, formData, {
                withCredentials:true
            });

            const updatedImageUrl = res.data.profilePhoto; // Assuming the backend returns the updated profile photo URL
            localStorage.setItem("profilePicture", updatedImageUrl);

            setTimeout(() => {
                navigate("/loader");

                setTimeout(() => {
                    navigate("/profile");
                }, 4000);
            }, 1000);
        } catch (error) {
            console.error("Error saving profile photo:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageClick = () => {
        document.getElementById("fileInput").click();
    };

    return (
        <div className="w-full min-h-screen bgimage2 flex justify-center items-center p-4">
            <div className="w-full max-w-[320px] bg-white rounded-3xl shadow-lg p-6 sm:p-8 flex flex-col items-center">
                <h1 id="signInText" className="font-bold text-2xl text-center">
                    Edit profile photo
                </h1>
                <div className="w-full flex justify-center items-center my-6">
                    <img
                        src={imageUrl}
                        alt=""
                        className="w-40 h-40 sm:w-48 sm:h-48 object-cover border-4 border-blue-950 rounded-full cursor-pointer"
                        onClick={handleImageClick}
                    />
                </div>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
                <button
                    onClick={handleSave}
                    className="loginButton text-base sm:text-lg hover:bg-blue-700 text-white py-3 rounded-lg mt-4 w-full transition duration-300 font-extrabold"
                    disabled={isLoading}
                >
                    {isLoading ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
};

export default Photo;