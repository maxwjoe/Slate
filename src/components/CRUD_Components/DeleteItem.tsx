import React from 'react'
import {useAppSelector, useAppDispatch} from '../../redux/hooks'
import {IItem} from '../../interfaces/DataInterfaces'
import { RDX_deleteItem } from '../../redux/slices/itemSlice';
import { getCurrentTheme } from '../../services/themeService';


interface Props {
    ItemObj : IItem,
    closeHandler : any,
}


function DeleteItem({ItemObj, closeHandler} : Props) {

    const dispatch = useAppDispatch();

    const handleDelete = async () => {
        await dispatch(RDX_deleteItem(ItemObj?._id))
        closeHandler();
    }


  return (
    <div className='flex flex-col space-y-6 bg-slate-dark p-3'>
        
        <div className='flex flex-col space-y-3 p-3 items-center justify-center grow'>
          <p className='text-2xl text-text-main'>{`Delete "${ItemObj?.title}"?`}</p>
          <p className='text-md text-text-main'>This action cannot be undone</p>
        </div>
  
        <div className='flex flex-row w-full justify-end space-x-3'>
            <button 
                    onClick={() => closeHandler()}
                    className='text-text-main w-24 h-10 border-[2px] border-text-main font-bold rounded-md'>Cancel</button>
           <button 
                    onClick={handleDelete}
                    style = {{background : getCurrentTheme().accent}}
                    className='text-text-main w-24 h-10 font-bold border-2 border-none rounded-md'>Confirm</button>
        </div>
      </div>
  )
}

export default DeleteItem