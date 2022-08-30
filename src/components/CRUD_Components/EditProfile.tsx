import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IAuth } from '../../interfaces/IAuth'
import { Option } from '../../interfaces/OptionInterface';
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { RDX_updateUser } from '../../redux/slices/authSlice';
import { generatePictureString, getProfileImageFromAPI } from '../../services/profilePictureService';
import { editUserInterface } from '../../viewModels/editUserInterface';
import DropdownSelector from '../Other/DropdownSelector'

interface Props {
    closeHandler : any;
}

function EditProfile({closeHandler} : Props) {

    const curUser : IAuth = useAppSelector((state) => state.auth.user) || {} as IAuth;
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<editUserInterface>({
        username : curUser?.username,
        email : curUser?.email,
        profileImage : curUser?.profileImage,
    })
    const [selectedAvatarStyle, setSelectedAvatarStyle] = useState<string>(curUser?.profileImage?.split("_")?.[1]);

    const avatarStyles : Option[] = [
      {disp : "Robot", real : "bottts"},
      {disp : "Cartoon", real : "avataaars"},
      {disp : "Pixel People", real : "pixel-art"}
    ]

    // Helper function to extract correct display name from profile image string
    const profileImageToAvatarStyle = (imageString : string) => {
      const style : string = curUser?.profileImage?.split("_")?.[1];
      if(!style) return "Select an option";
      for(let i = 0 ; i < avatarStyles.length ; i++){
        if(avatarStyles[i].real === style){
          return avatarStyles[i].disp;
        }
      }
    }

      // onChange : Handles input change and updates formData
  const onChange = (e : any) => {
    setFormData((prevState : editUserInterface) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  // onSubmit : Handles submitting the form 
  const onSubmit = (e : any) => {
    e.preventDefault();

    if(!(formData.username && formData.email))
    {
      toast.error("Please fill out all fields");
      return;
    }

    if(formData.email.split("@").length != 2)
    {
      toast.error("Invalid email address");
      return;
    }

    // Create new Source Object
    const updatedUser : IAuth = {
      ...curUser,
      username : formData.username,
      email : formData.email,
      profileImage : formData.profileImage,
    };

    dispatch(RDX_updateUser(updatedUser));
    closeHandler();
  }


  return (
    <div className='flex flex-col items-center p-3 w-[40vw] min-h-[300px] h-[80vh] select-none'>
        
        <div className='flex items-center justify-center w-full h-12'>
          <p className='text-2xl text-text-main'>{"Profile Settings"}</p>
        </div>
        
        <div className='flex w-full p-3 flex-col space-y-5 grow items-start justify-start'>
          <div className='flex space-y-2 flex-col w-full'>
            <p className='text-lg text-text-main'>Display Name</p>
            <input 
                  type="text" 
                  name ="username"
                  className='w-full p-3 h-9 outline-none border-none bg-slate-lightdark text-text-secondary rounded-md'
                  value = {formData.username}
                  onChange={onChange}
                  />
          </div>
          <div className='flex space-y-2 flex-col w-full'>
            <p className='text-lg text-text-main'>Email</p>
            <input 
                  type="email" 
                  name ="email"
                  className='w-full p-3 h-9 outline-none border-none bg-slate-lightdark text-text-secondary rounded-md'
                  value = {formData.email}
                  onChange={onChange}
                  />
          </div>
          <div className='flex space-y-2 flex-col w-full'>
            <p className='text-lg text-text-main' >Profile Picture</p>
            <div className="flex w-full p-3 items-center justify-evenly">
              <img 
                  src={getProfileImageFromAPI(formData.profileImage)}
                  className = "w-16 h-16 border-2 border-text-main rounded-md"
                  />
              <a 
                  onClick = {() => setFormData({...formData, profileImage : generatePictureString(selectedAvatarStyle)})}
                  className='flex items-center justify-center w-1/3 h-10 bg-slate-accent rounded-md text-text-main p-3 cursor-pointer'>
                  Regenerate
              </a>
            </div>
        </div>
          <div className='flex space-y-2 flex-col w-full'>
            <p className='text-lg text-text-main'>Image Style</p>
            <DropdownSelector options = {avatarStyles} selectionFunction = {(style : string) => {setSelectedAvatarStyle(style);}} defaultSelection={profileImageToAvatarStyle(formData.profileImage)}/>
          </div>
        </div>
        <div className='flex flex-row w-full justify-end space-x-3'>
            <button 
                    onClick={() => closeHandler()}
                    className='text-text-main w-24 h-10 border-[2px] border-text-main font-bold rounded-md'>Cancel</button>
            <button 
                    onClick={onSubmit}
                    className='text-text-main w-24 h-10 bg-slate-accent font-bold border-2 border-none rounded-md'>Confirm</button>
        </div>
      </div>
  )
  
}

export default EditProfile