import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAppDispatch } from '../../redux/hooks';
import { RDX_createArticle } from '../../redux/slices/articleSlice';
import { getCurrentTheme } from '../../services/themeService';
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
        associatedList : 'None',
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

    if(!(formData.title && formData.content))
    {
      toast.error("Please enter all fields");
      return;
    }

    dispatch(RDX_createArticle(formData))
    closeHandler()
  }
  return (
    <div className='flex flex-col items-center p-3 w-[40vw] min-h-[300px] h-[75vh]'>
        
        <div className='flex items-center justify-center w-full h-12'>
          <p className='text-2xl text-text-main'>Create Article</p>
        </div>
        
        <div className='flex w-full p-3 flex-col space-y-5 grow items-start justify-start overflow-hidden'>
          <div className='flex space-y-2 flex-col w-full'>
            <p className='text-lg text-text-main'>Title</p>
            <input 
                  type="text" 
                  name ="title"
                  className='w-full p-3 h-9 outline-none border-none bg-slate-lightdark text-text-secondary rounded-md'
                  value = {formData.title}
                  onChange={onChange}
                />
          </div>

          <div className='flex space-y-2 flex-col w-full'>
            <p className='text-lg text-text-main'>Content</p>
            <textarea
                  name = "content"
                  className='w-full p-3 h-[210px] resize-none outline-none border-none bg-slate-lightdark text-text-secondary rounded-md scrollbar-thin'
                  value={formData.content}
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