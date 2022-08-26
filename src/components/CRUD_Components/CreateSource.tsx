import React, {useState} from 'react'
import {ISource} from '../../interfaces/DataInterfaces'
import { useAppDispatch } from '../../redux/hooks';
import { RDX_createSource } from '../../redux/slices/sourceSlice';
import {createSourceViewModel} from '../../viewModels/sourceViewModels'

interface Props {
  exampleLanguage : string,
  exampleTitle : string,
  closeHandler : any,
}


function CreateSource({closeHandler, exampleLanguage, exampleTitle} : Props) {

  const [formData, setFormData] = useState<createSourceViewModel>({
    title : '',
    language : ''
  });

  const dispatch = useAppDispatch();

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

    const sourceData : any = {
      title : formData.title,
      language : formData.language,
    }
    dispatch(RDX_createSource(sourceData))
    closeHandler()
  }


  return (
      <div className='flex flex-col items-center p-3 w-[40vw] h-[50vh]'>
        
        <div className='flex items-center justify-center w-full h-12'>
          <p className='text-2xl text-text-main'>Create Source</p>
        </div>
        
        <div className='flex w-full p-3 flex-col space-y-5 grow items-start justify-start'>
          <div className='flex flex-col w-full'>
            <p className='text-lg text-text-main'>Title</p>
            <input 
                  type="text" 
                  name ="title"
                  className='w-[75%] h-8 outline-none border-none bg-slate-lightdark text-text-secondary'
                  value = {formData.title}
                  onChange={onChange}
                  placeholder={`Eg. ${exampleTitle}`}/>
          </div>

          <div className='flex flex-col w-full'>
            <p className='text-lg text-text-main'>Language</p>
            <input 
                  type="text" 
                  name = "language"
                  value={formData.language}
                  onChange={onChange}
                  placeholder={`Eg. ${exampleLanguage}`} />
          </div>
        </div>
          <button 
                  onClick={onSubmit}
                  className='text-text-main font-bold border-2 border-text-danger rounded-md'>Confirm</button>
      </div>
  )
}

export default CreateSource