import React from 'react'
import { IItem } from '../../interfaces/DataInterfaces'
import {GoPrimitiveDot} from 'react-icons/go'

interface Props {
    ItemObj : IItem;
    isSelected? : boolean;
}

function ListItem({ItemObj, isSelected} : Props) {
  return (
    <div className={`flex flex-row items-start space-x-2 justify-center w-full h-full rounded-md ${isSelected ? "bg-slate-accent text-text-main" : "bg-slate-dark hover:bg-slate-lightdark"} p-3 cursor-default`}>
      <GoPrimitiveDot className='text-text-main mt-2'/>
      <div className='flex flex-col justify-center items-start grow '>
        <p className='text-md text-text-main'>{ItemObj.title}</p>
        <p className={`text-xs ${isSelected ? "text-text-main" : "text-text-secondary"}`}>{ItemObj.definition}</p>
      </div>
    </div>
  )
}

export default ListItem