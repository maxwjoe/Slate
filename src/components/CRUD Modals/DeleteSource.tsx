import React from 'react'
import {useAppSelector, useAppDispatch} from '../../redux/hooks'
import { RDX_deleteSource } from '../../redux/slices/sourceSlice';
import {ISource} from '../../interfaces/DataInterfaces'


interface Props {
    SourceObj : ISource,
}


function DeleteSource({SourceObj} : Props) {

    const dispatch = useAppDispatch();

    const handleDelete = async () => {
        dispatch(RDX_deleteSource(SourceObj?._id))
    }


  return (
    <div className='flex flex-col items-center justify-center w-[50vw] h-[50vh]'>
        <p className='text-text-main'>{`Are you sure you want to delete ${SourceObj?.title}?`}</p>
        <p className='text-text-main'>Hi</p>
        <button 
                onClick={async () => {await handleDelete()}}
                className='text-text-main font-bold border-2 border-text-danger rounded-md'>Confirm</button>
    </div>
  )
}

export default DeleteSource