import React, { useState } from 'react'
import { IDropDownPackage } from '../../interfaces/IDropDownPackage'

interface Props {
    DropdownPackage : IDropDownPackage
}

function FloatingMenuOption({DropdownPackage} : Props) {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClick = () => {
      DropdownPackage.ActionFunction();
    }

  return (
    <div 
        className='flex items-center justify-start p-1 space-x-2 w-full h-10 cursor-pointer rounded-md hover:bg-slate-dark' 
        onClick = {handleClick}>
        <DropdownPackage.Icon className='text-text-main w-5 h-5'/>
        <p className='text-text-main'>{DropdownPackage.ActionTitle}</p>
    </div>
  )
}

export default FloatingMenuOption