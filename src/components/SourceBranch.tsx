import React, {useState} from 'react'
import {AiOutlineCaretDown, AiOutlineCaretRight} from 'react-icons/ai'
import {FiEdit} from 'react-icons/fi'
import {BsThreeDots} from 'react-icons/bs'
import SubSourceBranch from './SubSourceBranch'
import Dropdown from '../components/Dropdown'
import { IDropDownPackage } from '../interfaces/IDropDownPackage'

interface Props {
    SourceObj : any;
}


function SourceBranch({SourceObj} : Props) {

    const [open, setOpen] = useState<boolean>(false);
    const [openDropDown, setOpenDropDown] = useState<boolean>(false);

    // handleToggle : Handles opening and closing the source
    const handleToggle = () => {
        setOpen(!open);
    }

    // Dropdown packages for options menu
    const DropDownPackages : IDropDownPackage[] = [
        {Icon : FiEdit, ActionTitle : "Profile", ActionFunction : () => console.log("Edit")},
        {Icon : FiEdit, ActionTitle : "Logout", ActionFunction : () => console.log("Edit")},
        {Icon : FiEdit, ActionTitle : "Profile", ActionFunction : () => console.log("Edit")},
        {Icon : FiEdit, ActionTitle : "Logout", ActionFunction : () => console.log("Edit")},
    ]


  return (
    <>
        <div className='flex relative items-center justify-between space-x-3 pr-2 pl-2 w-full h-6'>
            <div onClick = {handleToggle} className='flex justify-start space-x-2 items-center'>
                {open ? <AiOutlineCaretDown className='text-text-secondary text-md'/> : <AiOutlineCaretRight className='text-text-secondary text-md'/>}
                <p className='text-md text-text-secondary cursor-default select-none'>{SourceObj.title}</p>
            </div>

            <BsThreeDots onClick={() => setOpenDropDown(!openDropDown)} className='text-text-secondary cursor-pointer text-md'/>
            

                {openDropDown && 
                    <Dropdown dropDownPackages={DropDownPackages} offset = {{l : 'auto', r : 'auto', t : 'auto', b : 'auto'}}/>
                }
        </div>

    {open && 
        <div className='flex flex-col space-y-3 items-end justify-center w-full'>
            <SubSourceBranch/>
            <SubSourceBranch/>
            <SubSourceBranch/>
            <SubSourceBranch/>
        </div>
    }
    </>
  )
}

export default SourceBranch