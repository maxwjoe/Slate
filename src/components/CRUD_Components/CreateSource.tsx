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
    <div className='flex flex-col items-center justify-center w-[50vw] h-[50vh]'>
        <p className='text-text-main'>Create a new Source</p>
        <p className='text-text-main'>Title</p>
        <input 
              type="text" 
              name ="title"
              value = {formData.title}
              onChange={onChange}
              placeholder={`Eg. ${exampleTitle}`}/>
        <p className='text-text-main'>Language</p>
        <input 
              type="text" 
              name = "language"
              value={formData.language}
              onChange={onChange}
              placeholder={`Eg. ${exampleLanguage}`} />
        <button 
                onClick={onSubmit}
                className='text-text-main font-bold border-2 border-text-danger rounded-md'>Confirm</button>
    </div>
  )
}

export default CreateSource