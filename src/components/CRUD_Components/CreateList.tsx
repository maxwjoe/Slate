import React, { useState } from 'react'
import { useAppDispatch } from '../../redux/hooks';
import { RDX_createList } from '../../redux/slices/listSlice';
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

    dispatch(RDX_createList(formData))
    closeHandler()
  }
  return (
    <div className='flex flex-col items-center justify-center w-[50vw] h-[50vh]'>
        <p className='text-text-main'>Add a List</p>
        <p className='text-text-main'>Title</p>
        <input 
              type="text" 
              name ="title"
              value = {formData.title}
              onChange={onChange}
              placeholder={`Eg. Example Title`}/>
        <p className='text-text-main'>Language</p>
        <button 
                onClick={onSubmit}
                className='text-text-main font-bold border-2 border-text-danger rounded-md'>Confirm</button>
    </div>
  )
}

export default CreateArticle