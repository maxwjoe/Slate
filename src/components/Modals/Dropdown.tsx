import React from 'react'
import {IDropDownPackage} from '../../interfaces/DropdownPackageInterface'
import ReactDom from 'react-dom'
import {useClickOutside} from '../../helper/UIHelpers'
import GenericModal from '../Modals/GenericModal';

interface Offset {
  t : any;
  b : any;
  l : any;
  r : any;
}

interface Props {
    dropDownPackages : IDropDownPackage[],
    offset : Offset,
    closeHandler : any,
}

// Dropdown : Responsible for rendering dropdown menus in UI (Profile Dropdown, three dots dropdowns)
function Dropdown({dropDownPackages, offset, closeHandler} : Props) {

  // --- Custom Hooks ---
  const domNode = useClickOutside(closeHandler)

  return ReactDom.createPortal(
    <div
        ref = {domNode}
        style = {{top : offset.t, bottom : offset.b , left : offset.l , right : offset.r }} 
        className="flex flex-col absolute bg-slate-super-dark rounded-md p-2 space-y-1">
        {dropDownPackages.map(({Icon, ActionTitle, ActionFunction} : IDropDownPackage, index : number) => (
            <div key={index} className='flex items-center justify-start p-1 space-x-2 w-full h-10 cursor-pointer rounded-md hover:bg-slate-dark' onClick = {ActionFunction}>
                <Icon className='text-text-main w-5 h-5'/>
                <p className='text-text-main'>{ActionTitle}</p>
            </div>
        ))}

    </div>, 
    document.getElementById('portal')!
  )
}

export default Dropdown