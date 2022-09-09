import React, { useState } from 'react'
import {useAppSelector, useAppDispatch} from '../../redux/hooks'
import {IItem} from '../../interfaces/DataInterfaces'
import { RDX_deleteItem } from '../../redux/slices/itemSlice';
import { getCurrentTheme } from '../../services/themeService';
import AsyncButton from '../Other/AsyncButton';
import { clearSelectedItem } from '../../redux/slices/applicationSlice';
import { registerDemo } from '../../redux/slices/authSlice';


interface Props {
    closeHandler : any,
}

// DemoConfirm : Component to populate delete item modal and handle logic

function DemoConfirm({closeHandler} : Props) {

  // --- Redux Hooks ---
  const dispatch = useAppDispatch();


  // --- Functions --- 

  // handleDemo : Handles a user creating a demo
  const handleDemo = async () => {
    dispatch(registerDemo())
    closeHandler();
  }


  return (
    <div className='flex flex-col space-y-6 bg-slate-dark p-3'>
        
        <div className='flex flex-col space-y-3 p-3 items-center justify-center grow'>
          <p className='text-2xl text-text-main'>{`Create a demo account?`}</p>
          <p className='text-md text-text-main'>You will only be able to login one time</p>
          <p className='text-md text-text-main'>A Slate tutorial can be found in the <a href="https://github.com/maxwjoe/Slate/blob/release/README.md" className='underline text-text-danger'>here</a></p>
        </div>
  
        <div className='flex flex-row w-full justify-end space-x-3'>
            <button 
                    onClick={() => closeHandler()}
                    className='text-text-main w-24 h-10 border-[2px] border-text-main font-bold rounded-md'>Cancel</button>
           <AsyncButton onSubmit={handleDemo} buttonText={"Confirm"} isLoading={false}/>
        </div>
      </div>
  )
}

export default DemoConfirm