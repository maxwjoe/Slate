import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAppDispatch } from '../../redux/hooks';
import { RDX_createList } from '../../redux/slices/listSlice';
import { getCurrentTheme } from '../../services/themeService';
import { createListViewModel } from '../../viewModels/createListViewModel';

interface Props {
    closeHandler : any;
    SourceId : string;
}

function CreateArticle({SourceId, closeHandler} : Props) {

    const [formData, setFormData] = useState<createListViewModel>({
        title : '',
        source : SourceId,
    });

    const dispatch = useAppDispatch();

    // onChange : Handles input change and updates formData
  const onChange = (e : any) => {
    setFormData((prevState : createListViewModel) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }
    // onSubmit : Handles login form submission
  const onSubmit = (e : any) => {
    e.preventDefault();

    if(!(formData.title))
    {
      toast.error("A title is required");
      return;
    }

    dispatch(RDX_createList(formData))
    closeHandler()
  }
  return (
    <div className='flex flex-col items-center p-3 w-[40vw] min-h-[250px]'>
        
        <div className='flex items-center justify-center w-full h-12'>
          <p className='text-2xl text-text-main'>New List</p>
        </div>
        
        <div className='flex w-full p-3 flex-col space-y-5 grow items-start justify-start'>
          <div className='flex space-y-2 flex-col w-full'>
            <p className='text-lg text-text-main'>List Name</p>
            <input 
                  type="text" 
                  name ="title"
                  className='w-full p-3 h-9 outline-none border-none bg-slate-lightdark text-text-secondary rounded-md'
                  placeholder='Enter a name'
                  value = {formData.title}
                  onChange={onChange}
                  />
          </div>
          
        </div>
        <div className='flex flex-row w-full justify-end space-x-3'>
            <button 
                    onClick={() => closeHandler()}
                    className='text-text-main w-24 h-10 border-[2px] border-text-main font-bold rounded-md'>Cancel</button>
            <button 
                    onClick={onSubmit}
                    style = {{background : getCurrentTheme().accent}}
                    className='text-text-main w-24 h-10 font-bold border-2 border-none rounded-md'>Confirm</button>
        </div>
      </div>
  )
}

export default CreateArticle