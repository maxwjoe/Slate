import React from 'react'
import Profile from './Profile'
import {AiOutlineSearch} from 'react-icons/ai'

function Header() {
  return (
    <div className='flex flex-row items-center w-full h-12 bg-slate-dark'>
        <div className='flex justify-start items-center w-[15%] min-w-[200px] h-full p-3 bg-green-400'>
            <p className='text-2xl font-bold text-text-main'>Slate</p>
        </div>
        <div className='flex grow flex-row items-center h-full bg-red-400'> 
            <div className='flex justify-center items-center grow h-full'>
                <div className='flex flex-row justify-start pl-3 pr-3 items-center bg-slate-black rounded-md w-[60%] h-[70%]'>
                <div className='flex items-center justify-center w-[5%] h-full'>
                    <AiOutlineSearch className='w-4 h-4 min-h-[15px] min-w-[15px] text-text-tertiary'/>
                </div>
                <input 
                    className='w-[95%] h-full outline-none border-none rounded-md p-3 bg-slate-black text-text-tertiary'
                    type="text" 
                    placeholder='Search'/>
                </div>
            </div>
            <div className='w-16 h-full flex items-center justify-center'>
                <Profile/>
            </div>
        </div>
    </div>
  )
}

export default Header