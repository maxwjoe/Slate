import React, { useState } from 'react'
import { IList } from '../../interfaces/DataInterfaces';
import { useAppDispatch } from '../../redux/hooks';
import { setSelectedItem, setSelectedList } from '../../redux/slices/applicationSlice';
import { RDX_createItem, RDX_getItems } from '../../redux/slices/itemSlice';
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
    
        await dispatch(RDX_createItem(formData))
        closeHandler()
      }

  return (
    <div className='flex flex-col items-center justify-center w-[50vw] h-[50vh]'>
        <p className='text-text-main'>Add a List</p>
        <p className='text-text-main'>Word</p>
        <input 
              type="text" 
              name ="title"
              value = {formData.title}
              onChange={onChange}
              placeholder={`Eg. Example Title`}/>
              <p className='text-text-main'>Definition</p>
        <input 
              type="text" 
              name ="definition"
              value = {formData.definition}
              onChange={onChange}
              placeholder={`Eg. Example Title`}/>
        <p className='text-text-main'>Pronuncation (optional)</p>
        <input 
              type="text" 
              name ="pronunciation"
              value = {formData.pronunciation}
              onChange={onChange}
              placeholder={`Eg. Example Title`}/>
        <button 
                onClick={onSubmit}
                className='text-text-main font-bold border-2 border-text-danger rounded-md'>Confirm</button>
    </div>
  )
}

export default CreateItem