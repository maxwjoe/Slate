import React, {useState} from 'react'
import Dropdown from './Dropdown';
import {BiLogOut} from 'react-icons/bi'
import {IDropDownPackage} from '../interfaces/IDropDownPackage'
import {IoMdSettings} from 'react-icons/io'
import {useNavigate} from 'react-router-dom'

function Profile() {

    const [open, setOpen] = useState<boolean>(false);

    const navigate = useNavigate();


    // ---  Drop Down Functions ---
    const logoutDropFunction = () => {
        setOpen(false);
        navigate('/login')
    }

    const profileDropFunction = () => {
        setOpen(false);
        console.log("Profile")
    }

    //Functionality to pass to drop down menu
    const dropDownItems : IDropDownPackage[] = [
        {Icon : IoMdSettings, ActionTitle : "Profile", ActionFunction : profileDropFunction},
        {Icon : BiLogOut, ActionTitle : "Logout", ActionFunction : logoutDropFunction},
    ]

  return (
    <>
        <div className='flex relative'>
            <img 
                className='object-cover w-8 h-8 rounded-md cursor-pointer'
                onClick={() => setOpen(!open)}
                src="https://image.shutterstock.com/mosaic_250/2780032/1854697390/stock-photo-head-shot-young-attractive-businessman-in-glasses-standing-in-modern-office-pose-for-camera-1854697390.jpg" 
                alt="" />
            
            {open && (
                <Dropdown dropDownPackages={dropDownItems}/>
            )}
            
        </div>
    </>
  )
}

export default Profile