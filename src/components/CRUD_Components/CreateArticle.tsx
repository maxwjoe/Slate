import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RDX_createArticle } from '../../redux/slices/articleSlice';
import { createArticleViewModel } from '../../viewModels/createArticleViewModel';
import AsyncButton from '../Other/AsyncButton';

interface Props {
    closeHandler : any;
    SourceId : string;
}

// CreateArticle : Component to populate create article modal and handle logic
function CreateArticle({SourceId, closeHandler} : Props) {

  // --- Redux State ---
  const ArticleLoading : boolean = useAppSelector((state) => state.articles.isLoading)

  // --- React State ---
  const [formData, setFormData] = useState<createArticleViewModel>({
      title : '',
      content : '',
      source : SourceId,
      associatedList : 'None',
  });

  // --- Redux Hooks ---
  const dispatch = useAppDispatch();


  // --- Function Definitions ---

  // onChange : Handles input change and updates formData
  const onChange = (e : any) => {
    setFormData((prevState : createArticleViewModel) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }
    // onSubmit : Handles login form submission
  const onSubmit = async (e : any) => {
    e.preventDefault();

    if(!(formData.title && formData.content))
    {
      toast.error("Please enter all fields");
      return;
    }

    await dispatch(RDX_createArticle(formData));
    
    closeHandler()
  }

  return (
    <div className='flex flex-col items-center p-3 w-[40vw] min-h-[300px] h-[75vh]'>
        
        <div className='flex items-center justify-center w-full h-12'>
          <p className='text-2xl text-text-main'>New Document</p>
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
            <AsyncButton onSubmit = {onSubmit} isLoading = {ArticleLoading} buttonText={"Confirm"}/>
        </div>
      </div>
  )
}

export default CreateArticle