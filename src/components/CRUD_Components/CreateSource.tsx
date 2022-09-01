import React, {useState} from 'react'
import toast from 'react-hot-toast';
import {ISource} from '../../interfaces/DataInterfaces'
import { useAppDispatch } from '../../redux/hooks';
import { RDX_createSource } from '../../redux/slices/sourceSlice';
import { getCurrentTheme } from '../../services/themeService';
import { languageOptions } from '../../services/translationService';
import {createSourceViewModel} from '../../viewModels/sourceViewModels'
import DropdownSelector from '../Other/DropdownSelector';

interface Props {
  exampleLanguage : string,
  exampleTitle : string,
  closeHandler : any,
}

// CreateSource : Component to populate create source modal and handle logic

function CreateSource({closeHandler, exampleLanguage, exampleTitle} : Props) {

  // --- React State ---
  const [formData, setFormData] = useState<createSourceViewModel>({
    title : '',
    language : ''
  });

  // --- Redux Hooks ---
  const dispatch = useAppDispatch();

  // --- Functions ---

  // onChange : Handles input change and updates formData
  const onChange = (e : any) => {
    setFormData((prevState : createSourceViewModel) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  // onSubmit : Handles login form submission
  const onSubmit = (e : any) => {
    e.preventDefault();

    if(!(formData.title && formData.language))
    {
      toast.error("Please fill out all fields")
      return;
    }

    const sourceData : any = {
      title : formData.title,
      language : formData.language,
    }
    dispatch(RDX_createSource(sourceData))
    closeHandler()
  }


  return (
      <div className='flex flex-col items-center p-3 w-[40vw] min-h-[300px] h-[52vh] select-none'>
        
        <div className='flex items-center justify-center w-full h-12'>
          <p className='text-2xl text-text-main'>New Collection</p>
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
                  placeholder={`Eg. ${exampleTitle}`}/>
          </div>

          <div className='flex space-y-2 flex-col w-full'>
            <p className='text-lg text-text-main'>Language</p>
            <DropdownSelector 
                              options = {languageOptions}
                              selectionFunction={(iso : string) => setFormData({...formData, language : iso})}/>
            {/* <input 
                  type="text" 
                  name = "language"
                  className='w-full p-3 h-9 outline-none border-none bg-slate-lightdark text-text-secondary rounded-md'
                  value={formData.language}
                  onChange={onChange}
                  placeholder={`Eg. ${exampleLanguage}`} /> */}
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

export default CreateSource