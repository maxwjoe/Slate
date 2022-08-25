import React, { useState } from 'react'
import Profile from './Profile'
import {AiOutlineSearch} from 'react-icons/ai'
import {IoMdAdd} from 'react-icons/io'
import GenericModal from '../Modals/GenericModal';
import CreateSource from '../CRUD_Components/CreateSource';
import {getExampleLanguage, getExampleTitle} from '../../helper/genData'

function Header() {

    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);


  return (
    <div className='flex flex-row items-center w-full h-12 bg-slate-dark'>
        <div className='flex justify-between items-center min-w-[215px] h-full p-3 bg-slate-super-dark'>
            <p className='text-2xl font-bold text-text-main'>Slate</p>
            <div className='flex justify-center items-center w-7 h-7 bg-slate-lightdark rounded-md cursor-pointer'>
                <IoMdAdd onClick={() => setOpenCreateModal(true)} className='text-text-main text-xl'/>
            </div>
        </div>
        {/* <div className='flex grow flex-row items-center h-full bg-red-400'> 
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
        </div> */}

        {openCreateModal && 
            <GenericModal handleClose={() => setOpenCreateModal(false)}>
                <CreateSource closeHandler={() => setOpenCreateModal(false)} exampleLanguage={getExampleLanguage()} exampleTitle = {getExampleTitle()}/>
            </GenericModal>
        }

    </div>
  )
}

export default Header