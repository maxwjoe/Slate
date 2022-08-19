import React, {useState} from 'react'
import {AiOutlineCaretDown, AiOutlineCaretRight} from 'react-icons/ai'
import {BsThreeDots} from 'react-icons/bs'
import SubSourceBranch from './SubSourceBranch'

function SourceBranch() {

    const [open, setOpen] = useState<boolean>(false)

    // handleToggle : Handles opening and closing the source
    const handleToggle = () => {
        setOpen(!open);
    }


  return (
    <>
    <div className='flex items-center justify-between space-x-3 pr-2 pl-2 w-full h-6'>
        <div onClick = {handleToggle} className='flex justify-start space-x-2 items-center'>
            {open ? <AiOutlineCaretDown className='text-text-secondary text-md'/> : <AiOutlineCaretRight className='text-text-secondary text-md'/>}
            <p className='text-md text-text-secondary cursor-default select-none'>Source Title</p>
        </div>
        <BsThreeDots className='text-text-secondary cursor-pointer text-md'/>
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