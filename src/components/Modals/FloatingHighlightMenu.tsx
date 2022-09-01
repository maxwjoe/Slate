import React from 'react'
import ReactDom from 'react-dom'
import { getFloatingActionMenuOffset, useClickOutside } from '../../helper/UIHelpers';
import { IHighlightOptions, ITextPosition } from '../../interfaces/FloatingMenuDataInterface'
import { SLATE_LIGHT_DARK, SLATE_SUPER_DARK } from '../../services/themeService';

interface Props {
    settings : IHighlightOptions;
    closeHandler : any;
}


// FloatingHighlightMenu : Menu that appears when user clicks on already highlighted text
function FloatingHighlightMenu({settings, closeHandler} : Props) {

    // --- Custom Hooks ---
    const domNode = useClickOutside(closeHandler);

    // --- Constants ---
    const offset = {
        ...getFloatingActionMenuOffset(settings?.position as ITextPosition),
        backgroundColor : SLATE_SUPER_DARK,
    };

    
    return ReactDom.createPortal(
    <div ref={domNode} style={offset} className='flex flex-col p-3 absolute w-[180px] h-[180px] bg-[#000]'>
        <div className='w-full h-1/2 bg-text-danger'>
            <p>{settings?.text}</p>
        </div>
        <div className='w-full h-1/2 bg-text-main'>
            <p>asdfasdf</p>
        </div>
    </div>
  , document.getElementById('portal')!
  )
}

export default FloatingHighlightMenu