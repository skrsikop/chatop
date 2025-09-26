import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Profile = () => {
  const {authUser, updateProfile} = useContext(AuthContext)
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);

  const handleSubmit  = async (e) => {
    e.preventDefault();
    if(!selectedImage) {
      await updateProfile({fullName: name, bio}) 
      navigate("/");
      return;
    }
    
    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({profilePic: base64Image, fullName: name, bio}) 
      navigate("/");
    }
  }
  return (
    <div className="min-h-screen bg-cover bg-no-repeat  flex items-center justify-center">
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between rounded-lg max-sm:flex-col-reverse'>
        <form onSubmit={handleSubmit} className="flex flex-col  gap-5 p-10 flex-1">
          <h3 className="text-lg">Profile Details</h3>
          <label htmlFor="avatar" className="flex cursor-pointer items-center gap-3">
            <input onChange={(e) => setSelectedImage(e.target.files[0]) } type="file" id="avatar" accept=".png, .jpg, .jpeg" hidden />
            <img src={selectedImage ? URL.createObjectURL(selectedImage ) : assets.avatar_icon} alt="image" className={`w-12 h-12 ${selectedImage && "rounded-full"}`} />
            Upload Profile Picture
          </label>
          <input type="text" required placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="p-3 rounded-md bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500" />

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="p-3 rounded-md bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Write Profile Bio"
            rows="3"
          />

          <button type="submit" className=" bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg">Save</button>
        </form>
        <img src={authUser?.profilePic || assets.logo_icon} alt="logo" className={`max-w-44 aspect-square  rounded-full mx-10 max-sm:mt-10 ${selectedImage && "rounded-full"}`} />
      </div>
    </div>
  );
};

export default Profile;
