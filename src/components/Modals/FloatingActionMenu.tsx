import React from 'react'
import ReactDom from 'react-dom'
import { useClickOutside } from '../../helper/UIHelpers'
import { IDropDownPackage } from '../../interfaces/IDropDownPackage'
import { IFloatingMenuData } from '../../interfaces/IFloatingMenuData'

interface Props {
    dropdownPackages : IDropDownPackage[],
    floatingMenuData : IFloatingMenuData,
    closeHandler : any,
}

function FloatingActionMenu({dropdownPackages, floatingMenuData, closeHandler} : Props) {

    const position = floatingMenuData.positionData
    const offsetStyle = {top : position.top + 30, bottom : position.bottom , left : position.left , right : position.right }

    const domNode = useClickOutside(closeHandler)


  return ReactDom.createPortal(
    <>
    <div
        ref = {domNode}
        style = {offsetStyle} 
        className='flex flex-col p-3 w-[180px] min-h-[130px] max-h-[200px] bg-slate-black absolute rounded-md'>
        <div className='flex pb-3 mb-3 w-full min-h-[30px] max-h-[33%] overflow-scroll scrollbar-thin border-b-2 border-slate-lightdark'>
            <p className='text-md text-text-main leading-tight'>{floatingMenuData.selectedText}</p>
        </div>
            {dropdownPackages.map(({Icon, ActionTitle, ActionFunction} : IDropDownPackage, index : number) => (
                <div key={index} className='flex items-center justify-start p-1 space-x-2 w-full h-10 cursor-pointer rounded-md hover:bg-slate-dark' onClick = {ActionFunction}>
                    <Icon className='text-text-main w-5 h-5'/>
                    <p className='text-text-main'>{ActionTitle}</p>
                </div>
            ))}
    </div>
    
    </>,
    document.getElementById("portal")!
  )
}

export default FloatingActionMenu