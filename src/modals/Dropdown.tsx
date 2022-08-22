import React from 'react'
import {IDropDownPackage} from '../interfaces/IDropDownPackage'
import ReactDom from 'react-dom'
import {useClickOutside} from '../helper/positionHelpers'
import GenericModal from './GenericModal';

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

function Dropdown({dropDownPackages, offset, closeHandler} : Props) {


  const domNode = useClickOutside(closeHandler)

  return ReactDom.createPortal(
    <div
        ref = {domNode}
        style = {{top : offset.t, bottom : offset.b , left : offset.l , right : offset.r }} 
        className="flex flex-col absolute w-24 bg-[#000] rounded-md p-1 space-y-1">
        {dropDownPackages.map(({Icon, ActionTitle, ActionFunction} : IDropDownPackage, index : number) => (
            <div key={index} className='flex items-center justify-start space-x-2 w-full h-10 cursor-pointer rounded-md hover:bg-slate-dark' onClick = {ActionFunction}>
                <Icon className='text-text-main w-5 h-5'/>
                <p className='text-text-main'>{ActionTitle}</p>
            </div>
        ))}

    </div>, 
    document.getElementById('portal')!
  )
}

export default Dropdown