import React, { useState } from 'react'
import { IDropDownPackage } from '../../interfaces/DropdownPackageInterface'
import {Ring} from '@uiball/loaders'
import { SLATE_TEXT_MAIN } from '../../services/themeService';

interface Props {
    DropdownPackage : IDropDownPackage
}

// FloatingMenuOption : Component responsible for rendering a menu option in the floating action menu
function FloatingMenuOption({DropdownPackage} : Props) {

    // --- React State --- 
    const [isLoading, setIsLoading] = useState<boolean>(false);
   
    // --- Functions ---

    // handleClick : Handles the user clicking the option in the menu
    const handleClick = async () => {
      setIsLoading(true);
      await DropdownPackage.ActionFunction();
      setIsLoading(false);
    }

  return (
    <div 
        className='flex items-center justify-start p-1 space-x-2 w-full h-10 cursor-pointer rounded-md hover:bg-slate-dark' 
        onClick = {handleClick}>
        {isLoading ? 
        (
          <div className='flex items-center justify-center w-full h-full'>
            <Ring size={25} color={SLATE_TEXT_MAIN}/>
          </div>
        )
        : 
        (
          <>
            <DropdownPackage.Icon className='text-text-main w-5 h-5'/>
            <p className='text-text-main'>{DropdownPackage.ActionTitle}</p>
          </>
        )
        }
    </div>
  )
}

export default FloatingMenuOption