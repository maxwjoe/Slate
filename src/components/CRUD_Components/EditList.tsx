import React, { useState } from 'react'
import { IList } from '../../interfaces/DataInterfaces'
import { useAppDispatch } from '../../redux/hooks';
import { RDX_updateList } from '../../redux/slices/listSlice';
import { createListViewModel } from '../../viewModels/createListViewModel';


interface Props {
    ListObj : IList,
    closeHandler : any,
}


function EditList({ListObj, closeHandler} : Props) {
    const [formData, setFormData] = useState<createListViewModel>({
        title : ListObj.title,
        source : ListObj.source
      })
    
      const dispatch = useAppDispatch();
    
      // onChange : Handles input change and updates formData
      const onChange = (e : any) => {
        setFormData((prevState : createListViewModel) => ({
          ...prevState,
          [e.target.name] : e.target.value
        }))
      }
    
      // onSubmit : Handles submitting the form 
      const onSubmit = (e : any) => {
        e.preventDefault();
    
        // Create new List Object
        const updatedList : IList = {
          ...ListObj,
          title : formData.title,
        };
    
        dispatch(RDX_updateList(updatedList));
        closeHandler();
      }
    
      return (
        <div className='flex flex-col items-center justify-center w-[50vw] h-[50vh]'>
            <p className='text-text-main'>Edit List</p>
            <p className='text-text-main'>Title</p>
            <input 
                  type="text" 
                  name ="title"
                  value = {formData.title}
                  onChange={onChange}
                  placeholder={`New Title`}/>
            <button 
                    onClick={onSubmit}
                    className='text-text-main font-bold border-2 border-text-danger rounded-md'>Confirm</button>
        </div>
      )
    }
    
    export default EditList