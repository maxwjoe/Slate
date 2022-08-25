import React from 'react'
import {useAppSelector, useAppDispatch} from '../../redux/hooks'
import {IItem} from '../../interfaces/DataInterfaces'
import { RDX_deleteItem } from '../../redux/slices/itemSlice';


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
    <div className='flex flex-col items-center justify-center w-[50vw] h-[50vh]'>
        <p className='text-text-main'>{`Are you sure you want to delete ${ItemObj?.title}?`}</p>
        <p className='text-text-main'>Hi</p>
        <button 
                onClick={async () => {await handleDelete()}}
                className='text-text-main font-bold border-2 border-text-danger rounded-md'>Confirm</button>
    </div>
  )
}

export default DeleteItem