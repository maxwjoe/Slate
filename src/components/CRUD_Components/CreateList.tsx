import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RDX_createList } from '../../redux/slices/listSlice';
import { getCurrentTheme } from '../../services/themeService';
import { createListViewModel } from '../../viewModels/createListViewModel';
import AsyncButton from '../Other/AsyncButton';

interface Props {
    closeHandler : any;
    SourceId : string;
}

// CreateList : Component to populate create list modal and handle logic

function CreateArticle({SourceId, closeHandler} : Props) {

  // --- Redux State ---
  const ListLoading : boolean = useAppSelector((state) => state.lists.isLoading);

  // --- React State ---
  const [formData, setFormData] = useState<createListViewModel>({
      title : '',
      source : SourceId,
  });

  // --- Redux Hooks ---
  const dispatch = useAppDispatch();

  // --- Functions ---

  // onChange : Handles input change and updates formData
  const onChange = (e : any) => {
    setFormData((prevState : createListViewModel) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }
    // onSubmit : Handles login form submission
  const onSubmit = async (e : any) => {
    e.preventDefault();

    if(!(formData.title))
    {
      toast.error("A title is required");
      return;
    }

    await dispatch(RDX_createList(formData))
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
            <AsyncButton onSubmit={onSubmit} buttonText={"Confirm"} isLoading={ListLoading}/>
        </div>
      </div>
  )
}

export default CreateArticle