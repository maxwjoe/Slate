import React from 'react'
import { IItem } from '../../interfaces/DataInterfaces'
import {GoPrimitiveDot} from 'react-icons/go'
import { getCurrentTheme } from '../../services/themeService';
import {BsThreeDots} from 'react-icons/bs'


interface Props {
    ItemObj : IItem;
    isSelected? : boolean;
}

function ListItem({ItemObj, isSelected} : Props) {

  const selectionColor : string = getCurrentTheme().accent;

  return (
    <div style={isSelected ? {background : selectionColor} : {}} className={`flex flex-row items-center space-x-2 justify-center w-full h-full rounded-md ${isSelected ? " text-text-main" : "bg-slate-dark hover:bg-slate-lightdark"} p-3 cursor-default`}>
     <GoPrimitiveDot className='text-text-main'/>
      <div className='flex flex-col justify-center items-start grow '>
        <p className='text-md text-text-main'>{ItemObj.title}</p>
        <p className={`text-xs ${isSelected ? "text-text-main" : "text-text-secondary"}`}>{ItemObj.definition}</p>
      </div>
      {/* <div className='flex justify-center items-center'>
        <BsThreeDots className='text-lg cursor-pointer'/>
      </div> */}
    </div>
  )
}

export default ListItem