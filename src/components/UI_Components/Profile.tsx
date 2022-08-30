import React, {useState} from 'react'
import Dropdown from '../Modals/Dropdown';
import {BiLogOut} from 'react-icons/bi'
import {IDropDownPackage} from '../../interfaces/IDropDownPackage'
import {IoMdSettings} from 'react-icons/io'
import {useNavigate} from 'react-router-dom'
import {useAppSelector, useAppDispatch} from '../../redux/hooks'
import {logout, reset} from '../../redux/slices/authSlice'
import { resetAll } from '../../helper/authHelper';
import { applyShift, getComponentBounds } from '../../helper/UIHelpers';
import { IAuth } from '../../interfaces/IAuth';
import { getProfileImageFromAPI } from '../../services/profilePictureService';
import EditProfile from '../CRUD_Components/EditProfile';
import GenericModal from '../Modals/GenericModal';

function Profile() {

    const [open, setOpen] = useState<boolean>(false);
    const [openProfileSettings, setOpenProfileSettings] = useState<boolean>(false);
    const curUser : IAuth = useAppSelector((state) => state.auth.user) as IAuth;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const containerId : string = "profileContainer"
    const optionsLocation = getComponentBounds(containerId);

    const dropDownOffset = {
        l : applyShift(optionsLocation?.left, 150),
        r : applyShift(optionsLocation?.right,'auto'),
        t : applyShift(optionsLocation?.top, -70),
        b : applyShift(optionsLocation?.bottom, 'auto')
    }
    
    // ---  Drop Down Functions ---
    const logoutDropFunction = async () => {
        await dispatch(logout());
        resetAll(dispatch);
        navigate('/login');
        setOpen(false);
    }

    const profileDropFunction = () => {
        setOpen(false);
        setOpenProfileSettings(true);
    }

    //Functionality to pass to drop down menu
    const dropDownItems : IDropDownPackage[] = [
        {Icon : IoMdSettings, ActionTitle : "Profile", ActionFunction : profileDropFunction},
        {Icon : BiLogOut, ActionTitle : "Logout", ActionFunction : logoutDropFunction},
    ]

  return (
    <>
        <div onClick={() => setOpen(!open)} className='flex relative items-center p-3 flex-1 space-x-3 w-full hover:bg-slate-lightdark cursor-pointer'>
            <div className='flex w-8 h-full items-center'>
                <img 
                    className='object-cover w-8 h-8 rounded-md cursor-pointer'
                    src={getProfileImageFromAPI(curUser?.profileImage)} 
                    alt="" />
            </div>
            <div id = {containerId}  className='flex flex-col grow  h-full overflow-hidden items-center justify-center'>
                <p className='w-full text-start text-sm text-text-main whitespace-nowrap overflow-hidden'>
                    {curUser?.username || curUser?.email?.split("@")?.[0] || "Unknown User"}
                </p>
            </div>  
            
        </div>
            {open && (
                <Dropdown dropDownPackages={dropDownItems} offset = {dropDownOffset} closeHandler={() => setOpen(false)}/>
            )}

            {openProfileSettings && (
                <GenericModal handleClose={() => setOpenProfileSettings(false)}>
                    <EditProfile closeHandler={() => setOpenProfileSettings(false)}/>
                </GenericModal>
            )}
            
    </>
  )
}

export default Profile