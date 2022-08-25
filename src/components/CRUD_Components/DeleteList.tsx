import React from 'react'
import {useAppSelector, useAppDispatch} from '../../redux/hooks'
import {IList} from '../../interfaces/DataInterfaces'
import { RDX_deleteList } from '../../redux/slices/listSlice';


interface Props {
    ListObj : IList,
    closeHandler : any,
}


function DeleteList({ListObj, closeHandler} : Props) {

    const dispatch = useAppDispatch();

    const handleDelete = async () => {
        dispatch(RDX_deleteList(ListObj?._id))
        closeHandler();
    }


  return (
    <div className='flex flex-col items-center justify-center w-[50vw] h-[50vh]'>
        <p className='text-text-main'>{`Are you sure you want to delete ${ListObj?.title}?`}</p>
        <p className='text-text-main'>Hi</p>
        <button 
                onClick={async () => {await handleDelete()}}
                className='text-text-main font-bold border-2 border-text-danger rounded-md'>Confirm</button>
    </div>
  )
}

export default DeleteList