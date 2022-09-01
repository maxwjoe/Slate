import React from 'react'
import {useAppSelector, useAppDispatch} from '../../redux/hooks'
import {IItem} from '../../interfaces/DataInterfaces'
import { RDX_deleteItem } from '../../redux/slices/itemSlice';
import { getCurrentTheme } from '../../services/themeService';
import AsyncButton from '../Other/AsyncButton';
import { clearSelectedItem } from '../../redux/slices/applicationSlice';


interface Props {
    ItemObj : IItem,
    closeHandler : any,
}

// DeleteItem : Component to populate delete item modal and handle logic

function DeleteItem({ItemObj, closeHandler} : Props) {

  // --- Redux State ---
  const ItemLoading : boolean = useAppSelector((state) => state.items.isLoading);

  // --- Redux Hooks ---
  const dispatch = useAppDispatch();

  // --- Functions --- 

  // handleDelete : Handles a user pressing delete in UI
  const handleDelete = async () => {
      await dispatch(RDX_deleteItem(ItemObj?._id))
      dispatch(clearSelectedItem());
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
           <AsyncButton onSubmit={handleDelete} buttonText={"Confirm"} isLoading={ItemLoading}/>
        </div>
      </div>
  )
}

export default DeleteItem