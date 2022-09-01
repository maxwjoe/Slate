import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IAuth } from '../../interfaces/AuthInterface'
import { IOption } from '../../interfaces/OptionInterface';
import { ITheme } from '../../interfaces/ThemeInterface';
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { RDX_updateUser } from '../../redux/slices/authSlice';
import { generatePictureString, getProfileImageFromAPI } from '../../services/profilePictureService';
import { getAvailableThemes, getCurrentTheme } from '../../services/themeService';
import { editUserInterface } from '../../viewModels/editUserInterface';
import AsyncButton from '../Other/AsyncButton';
import DropdownSelector from '../Other/DropdownSelector'

interface Props {
    closeHandler : any;
}

// EditProfile : Component to populate edit profile modal and handle logic

function EditProfile({closeHandler} : Props) {

  // --- Redux State ---
  const AuthLoading : boolean = useAppSelector((state) => state.auth.isLoading);

  // --- Redux State ---
  const curUser : IAuth = useAppSelector((state) => state.auth.user) || {} as IAuth;
  const themes : ITheme[] = getAvailableThemes();
  const currTheme : ITheme = getCurrentTheme();
  
  // --- Redux Hooks ---
  const dispatch = useAppDispatch();

  // --- React State ---
  const [selectedAvatarStyle, setSelectedAvatarStyle] = useState<string>(curUser?.profileImage?.split("_")?.[1]);
  const [formData, setFormData] = useState<editUserInterface>({
    username : curUser?.username,
    email : curUser?.email,
    profileImage : curUser?.profileImage,
    themeAccent : curUser?.themeAccent,
  })

  // --- Constants ---
  const avatarStyles : IOption[] = [
    {disp : "Robot", real : "bottts"},
    {disp : "Cartoon", real : "avataaars"},
    {disp : "Pixel People", real : "pixel-art"}
  ]

  // --- Functions ---

  // Helper function to extract correct display name from profile image string
  const profileImageToAvatarStyle = (imageString : string) => {
    const style : string = curUser?.profileImage?.split("_")?.[1];
    if(!style) return "Select an IOption";
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
  const onSubmit = async (e : any) => {
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
      themeAccent : formData.themeAccent,
    };

    await dispatch(RDX_updateUser(updatedUser));
    closeHandler();
  }


  return (
    <div className='flex flex-col items-center p-3 w-[40vw] min-h-[300px] h-[95vh] select-none overflow-scroll scrollbar-thin'>
        
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
            <p className='text-lg text-text-main'>Theme</p>
            <div className='flex flex-row items-center justify-start pl-3 pr-3 w-full space-x-3'>
              {themes.map((theme : ITheme, index : number) => {
                const isSelected = theme.accent === formData.themeAccent
                return <div key={index}
                            onClick = {() => setFormData({...formData, themeAccent : theme.accent})}
                            className={`${isSelected ? "w-12 h-12" : "w-10 h-10"} cursor-pointer rounded-md ${isSelected && "border-2 border-text-main"}`} style={{background : theme.accent}}></div>
              })}
            </div>
          </div>
          <div className='flex space-y-2 flex-col w-full'>
            <p className='text-lg text-text-main' >Avatar</p>
            <div className="flex w-full p-3 items-center justify-evenly">
              <img 
                  src={getProfileImageFromAPI(formData.profileImage)}
                  className = "w-16 h-16 border-2 border-text-main rounded-md"
                  />
              <a 
                  onClick = {() => setFormData({...formData, profileImage : generatePictureString(selectedAvatarStyle)})}
                  style={{background : currTheme.accent}}
                  className={`flex items-center justify-center w-1/3 h-10 rounded-md text-text-main p-3 cursor-pointer`}>
                  Regenerate
              </a>
            </div>
        </div>
          <div className='flex space-y-2 flex-col w-full'>
            <p className='text-lg text-text-main'>Avatar Style</p>
            <DropdownSelector options = {avatarStyles} selectionFunction = {(style : string) => {setSelectedAvatarStyle(style);}} defaultSelection={profileImageToAvatarStyle(formData.profileImage)}/>
          </div>
        </div>
        <div className='flex flex-row w-full justify-end space-x-3'>
            <button 
                    onClick={() => closeHandler()}
                    className='text-text-main w-24 h-10 border-[2px] border-text-main font-bold rounded-md'>Cancel</button>
            <AsyncButton onSubmit={onSubmit} buttonText = {"Confirm"} isLoading={AuthLoading}/>
        </div>
      </div>
  )
  
}

export default EditProfile