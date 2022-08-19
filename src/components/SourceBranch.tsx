import React, {useState} from 'react'
import {AiOutlineCaretDown, AiOutlineCaretRight} from 'react-icons/ai'
import {BsThreeDots} from 'react-icons/bs'

function SourceBranch() {

    const [open, setOpen] = useState<boolean>(false)

    // handleToggle : Handles opening and closing the source
    const handleToggle = () => {
        setOpen(!open);
    }


  return (
    <div className='flex items-center justify-between space-x-3 pr-2 pl-2 w-full h-6'>
        <div onClick = {handleToggle} className='flex justify-start space-x-2 items-center'>
            {open ? <AiOutlineCaretDown className='text-text-main'/> : <AiOutlineCaretRight className='text-text-main'/>}
            <p className='text-md text-text-main cursor-default select-none'>Source Title</p>
        </div>
        <BsThreeDots className='text-text-main cursor-pointer'/>
    </div>
  )
}

export default SourceBranch