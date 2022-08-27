import React from 'react'
import ReactDom from 'react-dom'
import { useClickOutside } from '../../helper/UIHelpers'
import { IDropDownPackage } from '../../interfaces/IDropDownPackage'
import { IFloatingMenuData } from '../../interfaces/IFloatingMenuData'
import FloatingMenuOption from './FloatingMenuOption'
import {RiTranslate} from 'react-icons/ri'
import {IoMdAdd} from 'react-icons/io'

interface Props {
    floatingMenuData : IFloatingMenuData,
    closeHandler : any,
}

function FloatingActionMenu({floatingMenuData, closeHandler} : Props) {

    const position = floatingMenuData.positionData
    const offsetStyle = {top : position.top + 30, bottom : position.bottom , left : position.left , right : position.right }

    const domNode = useClickOutside(closeHandler)

    const dropdownPackages : IDropDownPackage[] = [
        {Icon : RiTranslate, ActionTitle : "Translate", ActionFunction : () => console.log(floatingMenuData.selectedText)},
        {Icon : IoMdAdd, ActionTitle : "Add to List", ActionFunction : () => console.log(floatingMenuData.selectedText)},
    ]


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
                <FloatingMenuOption key={index} DropdownPackage={{Icon, ActionTitle, ActionFunction}}/>
            ))}
    </div>
    
    </>,
    document.getElementById("portal")!
  )
}

export default FloatingActionMenu