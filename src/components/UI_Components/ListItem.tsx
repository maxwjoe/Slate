import React from 'react'
import { IItem } from '../../interfaces/DataInterfaces'

interface Props {
    ItemObj : IItem;
}

function ListItem({ItemObj} : Props) {
  return (
    <div className='flex flex-col justify-center items-start w-full h-12 bg-slate-dark hover:bg-slate-lightdark p-3 cursor-default'>
        <p className='text-md text-text-secondary'>{ItemObj.title}</p>
        <p className='text-sm text-text-secondary'>{ItemObj.definition}</p>
    </div>
  )
}

export default ListItem