import {useAppSelector, useAppDispatch} from '../../redux/hooks'
import {IArticle} from '../../interfaces/DataInterfaces'
import { RDX_deleteArticle } from '../../redux/slices/articleSlice';
import { getCurrentTheme } from '../../services/themeService';
import { reset as resetApplicationState } from '../../redux/slices/applicationSlice'
import AsyncButton from '../Other/AsyncButton';

interface Props {
    ArticleObj : IArticle,
    closeHandler : any,
}

// DeleteArticle : Component to populate delete article modal and handle logic

function DeleteArticle({ArticleObj, closeHandler} : Props) {

  // --- Redux State ---
  const ArticleLoading : boolean = useAppSelector((state) => state.articles.isLoading)

  // --- Redux Hooks ---
  const dispatch = useAppDispatch();

  // --- Functions ---

  // handleDelete : Handles a user pressing delete in UI
  const handleDelete = async () => {
      await dispatch(RDX_deleteArticle(ArticleObj?._id));
      dispatch(resetApplicationState());
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
            <AsyncButton onSubmit={handleDelete} buttonText={"Confirm"} isLoading={ArticleLoading}/>
        </div>
      </div>
  )
}

export default DeleteArticle