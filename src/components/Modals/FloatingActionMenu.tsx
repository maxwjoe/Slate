import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import { useClickOutside } from '../../helper/UIHelpers'
import { IDropDownPackage } from '../../interfaces/IDropDownPackage'
import { IFloatingMenuData, ITextPosition } from '../../interfaces/IFloatingMenuData'
import FloatingMenuOption from './FloatingMenuOption'
import {RiTranslate} from 'react-icons/ri'
import {IoMdAdd} from 'react-icons/io'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setFloatingMenuOpen, setSelectedText, setSelectionPosition } from '../../redux/slices/applicationSlice'

interface Props {
    closeHandler? : any,
}

function FloatingActionMenu({closeHandler} : Props) {

    const isOpen : boolean = useAppSelector((state) => state.applicationState.floatingMenuOpen);
    const selectedText : string = useAppSelector((state) => state.applicationState.selectedText) as string;
    const position : DOMRect = useAppSelector((state) => state.applicationState.selectionPosition) as DOMRect;

    const dispatch = useAppDispatch();

    const offsetStyle = {top : position?.top + 30, bottom : position?.bottom , left : position?.left , right : position?.right }

    const domNode = useClickOutside(() => {
        dispatch(setFloatingMenuOpen(false))
        dispatch(setSelectedText(""));
        dispatch(setSelectionPosition({} as ITextPosition))
    });

    const dropdownPackages : IDropDownPackage[] = [
        {Icon : RiTranslate, ActionTitle : "Translate", ActionFunction : () => {}},
        {Icon : IoMdAdd, ActionTitle : "Add to List", ActionFunction : () => {console.log(selectedText)}},
    ]


    if(!isOpen) return null;

  return ReactDom.createPortal(
    <>
    <div
        ref = {domNode}
        style = {offsetStyle} 
        className='flex flex-col p-3 w-[180px] min-h-[130px] max-h-[200px] bg-slate-black absolute rounded-md'>
        <div className='flex pb-3 mb-3 w-full min-h-[30px] max-h-[33%] overflow-scroll scrollbar-thin border-b-2 border-slate-lightdark'>
            <p className='text-md text-text-main leading-tight'>{selectedText}</p>
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