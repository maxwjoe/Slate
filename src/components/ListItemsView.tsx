import React from 'react'
import {FiEdit} from 'react-icons/fi'
import ListItem from './ListItem'

function ListItemsView() {
  return (
    <div className='flex flex-col min-w-[250px] h-full bg-slate-lightdark rounded-md'>
        <div className='flex flex-row w-full h-12 justify-between items-center pt-1 pr-3 pl-3'>
            <p className='text-2xl font-bold text-text-main'>List Title</p>
            <FiEdit className="text-2xl text-text-main cursor-pointer"/>
        </div>
        
        <div className='flex flex-col  w-full pt-4 pb-4 pr-4 pl-4 '>

            <div className='flex items-center justify-center cursor-pointer text-text-main w-full h-12 bg-[#715bff] rounded-md'>
                <p className='text-lg font-bold'>New Item</p>
            </div>
            <div className='flex flex-col space-y-2 max-h-[80vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-lightdark scrollbar-track-slate-super-dark overflow-x-hidden'>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
            </div>

        </div>
    </div>
  )
}

export default ListItemsView