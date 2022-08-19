import React from 'react'
import {IDropDownPackage} from '../interfaces/IDropDownPackage'


interface Props {
    dropDownPackages : IDropDownPackage[]
}

function Dropdown({dropDownPackages} : Props) {

  return (
    <div className='flex flex-col absolute top-[45px] right-0 w-24 bg-[#000] rounded-md p-1 space-y-1'>
        {dropDownPackages.map(({Icon, ActionTitle, ActionFunction} : IDropDownPackage, index : number) => (
            <div key={index} className='flex items-center justify-start space-x-2 w-full h-10 cursor-pointer rounded-md hover:bg-slate-dark' onClick = {ActionFunction}>
                <Icon className='text-text-main w-5 h-5'/>
                <p className='text-text-main'>{ActionTitle}</p>
            </div>
        ))}
    </div>
  )
}

export default Dropdown