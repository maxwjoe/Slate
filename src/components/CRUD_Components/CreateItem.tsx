import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { getSourceTitleFromId } from '../../helper/dataHelpers';
import { IList } from '../../interfaces/DataInterfaces';
import { useAppDispatch } from '../../redux/hooks';
import { setSelectedItem, setSelectedList } from '../../redux/slices/applicationSlice';
import { RDX_createItem, RDX_getItems } from '../../redux/slices/itemSlice';
import { getCurrentTheme } from '../../services/themeService';
import { createItemViewModel } from '../../viewModels/createItemViewModel';

interface Props {
    closeHandler : any;
    list : IList;
}


function CreateItem({closeHandler, list} : Props) {

    const [formData, setFormData] = useState<createItemViewModel>({
        title : "",
        definition : "",
        pronunciation : "",
        list : list._id,
    });

    const dispatch = useAppDispatch();

    // onChange : Handles input change and updates formData
    const onChange = (e : any) => {
        setFormData((prevState : createItemViewModel) => ({
          ...prevState,
          [e.target.name] : e.target.value
        }))
      }
        // onSubmit : Handles login form submission
      const onSubmit = async (e : any) => {
        e.preventDefault();

        if(!(formData.title && formData.list && formData.pronunciation))
        {
          toast.error("Please enter all fields")
          return;
        }
    
        await dispatch(RDX_createItem(formData))
        closeHandler()
      }

  return (
    <div className='flex flex-col items-center p-3 w-[40vw] min-h-[400px] h-[70vh]'>
        
        <div className='flex items-center justify-center w-full h-12'>
          <p className='text-2xl text-text-main'>{`Add a word to "${list.title}"`}</p>
        </div>
        
        <div className='flex w-full p-3 flex-col space-y-5 grow items-start justify-start'>
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
            <p className='text-lg text-text-main'>Definition</p>
            <input 
                  type="text" 
                  name = "definition"
                  className='w-full p-3 h-9 outline-none border-none bg-slate-lightdark text-text-secondary rounded-md'
                  value={formData.definition}
                  onChange={onChange}
                  />
          </div>
          <div className='flex space-y-2 flex-col w-full'>
            <p className='text-lg text-text-main'>Pronunciation</p>
            <input 
                  type="text" 
                  name = "pronunciation"
                  className='w-full p-3 h-9 outline-none border-none bg-slate-lightdark text-text-secondary rounded-md'
                  value={formData.pronunciation}
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

export default CreateItem