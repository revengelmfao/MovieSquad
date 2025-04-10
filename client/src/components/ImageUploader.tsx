import { useState, useRef } from "react";
import DefaultImage from "../assets/blueavatar.jpg";
import EditIcon from "../assets/editicon.svg";

const ImageUploader = () => {

  const [avatarURL, setAvatarURL] = useState(DefaultImage);

  const fileUploadRef = useRef()

  const handleImageUpload = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    fileUploadRef.current.click();

  }

  const uploadImageDisplay = async () => {
    try {
    const uploadFile = fileUploadRef.current.files[0];
    const formData = new FormData();
    
    formData.append("file", uploadFile);


    //const cachedURL = URL.createObjectURL(uploadFile);
    //setAvatarURL(cachedURL);

    const response = await fetch("https://api.escuelajs.co/api/v1/files/upload", {
      method: "post",
      body: formData
    });

    if (response.status === 201) {
      const data = await response.json();
    setAvatarURL(data?.location);
    }

  } catch (error) {
    console.error(error);
    setAvatarURL(DefaultImage);
  }
  }
  
  return (

    <div style={{marginLeft: 150, marginTop: 20} }>
    <div className="min-h-10 w-40 rounded-full">
  
    <img src={avatarURL}
          alt="Avatar"
          className="min-h-10 w-40 rounded-full">
    </img>  
    </div>

      <form id="form" encType="'multipart/form-data">
      <button
        type="submit"
        onClick={handleImageUpload}
        className="flex-center absolute top-100 right-200 h-9 w-9 ronded-full">
        
        <img
        src={EditIcon}
        alt="Edit"
        className="object-cover"
        ></img>
      </button>
        <input
          type="file"
          id="file"
          ref={fileUploadRef}
          hidden 
          onChange={uploadImageDisplay}>
            
        </input>
      </form>
    </div>
  );
};

export default ImageUploader;
