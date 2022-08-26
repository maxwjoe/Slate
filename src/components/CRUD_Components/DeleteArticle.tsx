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
    <div className='flex flex-col space-y-6 bg-slate-dark p-3'>
        
        <div className='flex flex-col space-y-3 p-3 items-center justify-center grow'>
          <p className='text-2xl text-text-main'>{`Delete "${ArticleObj?.title}"?`}</p>
          <p className='text-md text-text-main'>This action cannot be undone</p>
        </div>
  
        <div className='flex flex-row w-full justify-end space-x-3'>
            <button 
                    onClick={() => closeHandler()}
                    className='text-text-main w-24 h-10 border-[2px] border-text-main font-bold rounded-md'>Cancel</button>
            <button 
                    onClick={handleDelete}
                    className='text-text-main w-24 h-10 bg-slate-accent font-bold border-2 border-none rounded-md'>Confirm</button>
        </div>
      </div>
  )
}

export default DeleteArticle