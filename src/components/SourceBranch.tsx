import React, {useState} from 'react'
import {AiOutlineCaretDown, AiOutlineCaretRight} from 'react-icons/ai'
import {FiEdit} from 'react-icons/fi'
import {AiFillDelete} from 'react-icons/ai'
import {BsThreeDots} from 'react-icons/bs'
import SubSourceBranch from './SubSourceBranch'
import Dropdown from '../components/Dropdown'
import { IDropDownPackage } from '../interfaces/IDropDownPackage'
import {getComponentBounds, applyShift} from '../helper/positionHelpers'

interface Props {
    SourceObj : any;
}


// SourceBranch : Renders Source in Left Tree, has Toggle Functionality
function SourceBranch({SourceObj} : Props) {

    const [open, setOpen] = useState<boolean>(false);
    const [openDropDown, setOpenDropDown] = useState<boolean>(false);

    // handleToggle : Handles opening and closing the source
    const handleToggle = () => {
        setOpen(!open);
    }

    const sourceLocation = getComponentBounds(SourceObj.title);

    const dropDownOffset = {
        l : applyShift(sourceLocation?.left, 175),
        r : applyShift(sourceLocation?.right, 'auto'),
        t : applyShift(sourceLocation?.top, 24),
        b : applyShift(sourceLocation?.bottom, 'auto')
    }

    // Dropdown packages for options menu
    const DropDownPackages : IDropDownPackage[] = [
        {Icon : FiEdit, ActionTitle : "Edit", ActionFunction : () => console.log("Edit") },
        {Icon : AiFillDelete, ActionTitle : "Delete", ActionFunction : () => console.log("Edit")},
    ]


  return (
    <>
        <div id={SourceObj.title}  className='flex items-center relative justify-between space-x-3 pr-2 pl-2 w-full h-6'>
            <div onClick = {handleToggle} className='flex justify-start space-x-2 items-center'>
                {open ? <AiOutlineCaretDown className='text-text-secondary text-md'/> : <AiOutlineCaretRight className='text-text-secondary text-md'/>}
                <p className='text-md text-text-secondary cursor-default select-none'>{SourceObj.title}</p>
            </div>

            <BsThreeDots onClick={() => setOpenDropDown(true)} className='text-text-secondary cursor-pointer text-md'/>
            

                {openDropDown && 
                    <Dropdown dropDownPackages={DropDownPackages} offset = {dropDownOffset} clickHandler={() => setOpenDropDown(false)}/>
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