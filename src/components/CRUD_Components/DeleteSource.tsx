import React, { useState } from 'react'
import {useAppSelector, useAppDispatch} from '../../redux/hooks'
import { RDX_deleteSource } from '../../redux/slices/sourceSlice';
import {ISource} from '../../interfaces/DataInterfaces'
import toast from 'react-hot-toast';
import { getCurrentTheme } from '../../services/themeService';
import { reset as resetApplicationState } from '../../redux/slices/applicationSlice'
import AsyncButton from '../Other/AsyncButton';


interface Props {
    SourceObj : ISource,
    closeHandler : any,
}

// DeleteSource : Component to populate delete source modal and handle logic

function DeleteSource({SourceObj, closeHandler} : Props) {


  // --- Redux State ---
  const SourceLoading : boolean = useAppSelector((state) => state.sources.isLoading);

  // --- React State ---
  const [formData, setFormData] = useState<string>();

  // --- Redux Hooks ---
  const dispatch = useAppDispatch();

  // --- Functions ---

  // handleDelete : Handles a user clicking delete in UI
  const handleDelete = async () => {
      if(formData != SourceObj.title) 
      {
        toast.error("Titles do not match");
        return;
      }
      await dispatch(RDX_deleteSource(SourceObj?._id));
      dispatch(resetApplicationState());
      closeHandler()
  }

  // onChange : Handles input change and updates formData
  const onChange = (e : any) => {
    setFormData(e.target.value)
  }


  return (
    <div className='flex flex-col space-y-4 bg-slate-dark p-3 '>
        
        <div className='flex flex-col space-y-2 p-3 items-center justify-center grow'>
          <p className='text-2xl text-text-main'>{`Delete "${SourceObj?.title}"?`}</p>
          <p className='text-md text-text-main'>This action cannot be undone</p>
        </div>

        <div className='flex space-y-2 flex-col w-full'>
          <p className='text-lg text-text-main'>{`Type "${SourceObj.title}" to confirm`}</p>
          <input 
                type="text" 
                name ="title"
                className='w-full p-3 h-9 outline-none border-none bg-slate-lightdark text-text-secondary rounded-md'
                value = {formData}
                onChange={onChange}
                placeholder={`${SourceObj.title}`}/>
        </div>
  
        <div className='flex flex-row w-full justify-end space-x-3'>
            <button 
                    onClick={() => closeHandler()}
                    className='text-text-main w-24 h-10 border-[2px] border-text-main font-bold rounded-md'>Cancel</button>
          <AsyncButton onSubmit={handleDelete} buttonText={"Confirm"} isLoading={SourceLoading}/>
        </div>
      </div>
  )
}

export default DeleteSource