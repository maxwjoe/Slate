import React, { useState } from 'react'
import { useAppDispatch } from '../../redux/hooks';
import { RDX_createArticle } from '../../redux/slices/articleSlice';
import { createArticleViewModel } from '../../viewModels/createArticleViewModel';

interface Props {
    closeHandler : any;
    SourceId : string;
}

function CreateArticle({SourceId, closeHandler} : Props) {

    const [formData, setFormData] = useState<createArticleViewModel>({
        title : '',
        content : '',
        source : SourceId,
    });

    const dispatch = useAppDispatch();

    // onChange : Handles input change and updates formData
  const onChange = (e : any) => {
    setFormData((prevState : createArticleViewModel) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }
    // onSubmit : Handles login form submission
  const onSubmit = (e : any) => {
    e.preventDefault();

    dispatch(RDX_createArticle(formData))
    closeHandler()
  }
  return (
    <div className='flex flex-col items-center justify-center w-[50vw] h-[50vh]'>
        <p className='text-text-main'>Add an article</p>
        <p className='text-text-main'>Title</p>
        <input 
              type="text" 
              name ="title"
              value = {formData.title}
              onChange={onChange}
              placeholder={`Eg. Example Title`}/>
        <p className='text-text-main'>Language</p>
        <input 
              type="text" 
              name = "content"
              value={formData.content}
              onChange={onChange}
              placeholder={`Eg. Example Content`} />
        <button 
                onClick={onSubmit}
                className='text-text-main font-bold border-2 border-text-danger rounded-md'>Confirm</button>
    </div>
  )
}

export default CreateArticle