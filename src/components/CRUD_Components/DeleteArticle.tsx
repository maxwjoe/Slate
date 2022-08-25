import React from 'react'
import {useAppSelector, useAppDispatch} from '../../redux/hooks'
import {IArticle} from '../../interfaces/DataInterfaces'
import { RDX_deleteArticle } from '../../redux/slices/articleSlice';


interface Props {
    ArticleObj : IArticle,
    closeHandler : any,
}


function DeleteArticle({ArticleObj, closeHandler} : Props) {

    const dispatch = useAppDispatch();

    const handleDelete = async () => {
        dispatch(RDX_deleteArticle(ArticleObj?._id))
        closeHandler();
    }


  return (
    <div className='flex flex-col items-center justify-center w-[50vw] h-[50vh]'>
        <p className='text-text-main'>{`Are you sure you want to delete ${ArticleObj?.title}?`}</p>
        <p className='text-text-main'>Hi</p>
        <button 
                onClick={async () => {await handleDelete()}}
                className='text-text-main font-bold border-2 border-text-danger rounded-md'>Confirm</button>
    </div>
  )
}

export default DeleteArticle