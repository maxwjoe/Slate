import {useAppSelector, useAppDispatch} from '../../redux/hooks'
import {IList} from '../../interfaces/DataInterfaces'
import { RDX_deleteList } from '../../redux/slices/listSlice';
import { reset as resetApplicationState } from '../../redux/slices/applicationSlice';
import AsyncButton from '../Other/AsyncButton';


interface Props {
    ListObj : IList,
    closeHandler : any,
}

// DeleteList : Component to populate delete list modal and handle logic

function DeleteList({ListObj, closeHandler} : Props) {

  // --- Redux State ---
  const ListLoading : boolean = useAppSelector((state) => state.lists.isLoading);

  // --- Redux Hooks ---
  const dispatch = useAppDispatch();

  // --- Functions ---
  
  // handleDelete : Handles a user pressing delete in UI
  const handleDelete = async () => {
      await dispatch(RDX_deleteList(ListObj?._id));
      dispatch(resetApplicationState());
      closeHandler();
  }


  return (
    <div className='flex flex-col space-y-6 bg-slate-dark p-3'>
        
        <div className='flex flex-col space-y-3 p-3 items-center justify-center grow'>
          <p className='text-2xl text-text-main'>{`Delete "${ListObj?.title}"?`}</p>
          <p className='text-md text-text-main'>This action cannot be undone</p>
        </div>
  
        <div className='flex flex-row w-full justify-end space-x-3'>
            <button 
                    onClick={() => closeHandler()}
                    className='text-text-main w-24 h-10 border-[2px] border-text-main font-bold rounded-md'>Cancel</button>
            <AsyncButton onSubmit={handleDelete} buttonText={"Confirm"} isLoading={ListLoading}/>
            </div>
      </div>
  )
}

export default DeleteList