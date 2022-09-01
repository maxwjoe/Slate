import React from 'react'
import { getCurrentTheme } from '../../services/themeService';
import {Ring} from "@uiball/loaders"
import {SLATE_TEXT_MAIN} from '../../services/themeService'

interface Props {
    onSubmit : any;
    buttonText : string;
    isLoading : boolean;
}

// AsyncButton : Button that handles async rendering in UI
function AsyncButton({onSubmit, isLoading, buttonText} : Props) {
  return (
    <button 
            onClick={onSubmit}
            style = {{background : getCurrentTheme().accent}}
            className='text-text-main w-24 h-10 font-bold border-2 border-none rounded-md'>
                {isLoading ? (
                    <div className='flex justify-center items-center w-full h-full text-text-main'>
                        <Ring color={SLATE_TEXT_MAIN} size={28}/>
                    </div>
                ) 
                :
                (
                    <p>{buttonText}</p>
                )}
    </button>
  )
}

export default AsyncButton