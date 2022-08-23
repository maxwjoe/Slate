import React, { useState } from 'react'
import {ISource} from '../../interfaces/DataInterfaces'
import { useAppDispatch } from '../../redux/hooks'
import { RDX_updateSource } from '../../redux/slices/sourceSlice'
import { createSourceViewModel } from '../../viewModels/sourceViewModels'

interface Props {
    SourceObj : ISource,
    closeHandler : any,
}


// EditSource : UI to go inside the generic modal for editing a source
function EditSource({SourceObj, closeHandler} : Props) {

  const [formData, setFormData] = useState<createSourceViewModel>({
    title : SourceObj.title,
    language : SourceObj.language,
  })

  const dispatch = useAppDispatch();

  // onChange : Handles input change and updates formData
  const onChange = (e : any) => {
    setFormData((prevState : createSourceViewModel) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  // onSubmit : Handles submitting the form 
  const onSubmit = (e : any) => {
    e.preventDefault();

    // Create new Source Object
    const updatedSource : ISource = {
      ...SourceObj,
      title : formData.title,
      language : formData.language
    };

    dispatch(RDX_updateSource(updatedSource));
    closeHandler();
  }

  return (
    <div className='flex flex-col items-center justify-center w-[50vw] h-[50vh]'>
        <p className='text-text-main'>Edit</p>
        <p className='text-text-main'>Title</p>
        <input 
              type="text" 
              name ="title"
              value = {formData.title}
              onChange={onChange}
              placeholder={`New Title`}/>
        <p className='text-text-main'>Language</p>
        <input 
              type="text" 
              name = "language"
              value={formData.language}
              onChange={onChange}
              placeholder={`New Language`} />
        <button 
                onClick={onSubmit}
                className='text-text-main font-bold border-2 border-text-danger rounded-md'>Confirm</button>
    </div>
  )
}

export default EditSource