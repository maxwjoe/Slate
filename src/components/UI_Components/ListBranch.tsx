import React, { useState } from 'react'
import {RiArticleLine, RiListCheck2} from 'react-icons/ri'
import {BsThreeDots} from 'react-icons/bs'
import { IArticle, IList } from '../../interfaces/DataInterfaces'
import Dropdown from '../Modals/Dropdown'
import {AiFillDelete} from 'react-icons/ai'
import { IDropDownPackage } from '../../interfaces/IDropDownPackage'
import { applyShift, getComponentBounds } from '../../helper/positionHelpers'
import GenericModal from '../Modals/GenericModal'
import DeleteArticle from '../CRUD_Components/DeleteArticle'
import DeleteList from '../CRUD_Components/DeleteList'
import {setSelectedList} from '../../redux/slices/applicationSlice'
import { useAppDispatch } from '../../redux/hooks'

interface Props {
  ListObj : IList;
}


function ListBranch({ListObj} : Props) {

  const [openDropdown, setOpenDropDown] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedModal, setSelectedModal] = useState<string>("None");

  const dispatch = useAppDispatch();

  // handleDropdownDelete : Passed to dropdown menu to handle modal logic
  const handleDropdownDelete = () => {
    setOpenDropDown(false);
    setOpenModal(true);
  }

    // handleSelect : Handles selecting the article (When the user clicks on it)
    const handleSelect = () => {
      dispatch(setSelectedList(ListObj));
    }
  
  const dropDownPackage : IDropDownPackage[] = [
    {Icon : AiFillDelete, ActionTitle : `Delete "${ListObj.title}"`, ActionFunction : handleDropdownDelete}
  ];

  const sourceLocation = getComponentBounds(ListObj.title);

  const dropDownOffset = {
      l : applyShift(sourceLocation?.left, 175),
      r : applyShift(sourceLocation?.right, 'auto'),
      t : applyShift(sourceLocation?.top, 24),
      b : applyShift(sourceLocation?.bottom, 'auto')
  }

  // renderCRUDModal : Return correct CRUD Modal (Could Make this generic and import it ? )
  const renderCRUDModal = (modalName : string) => {
    switch(modalName)
    {
        case "Delete" :
            return null
        default :
            return null
    }
}  


  return (
    <div id={ListObj.title} className='flex items-center justify-start w-full h-8 pr-2 pl-8 hover:bg-slate-lightdark rounded-md'>
        <div onClick = {handleSelect} className='flex grow justify-start space-x-1 items-center cursor-pointer'>
            <RiListCheck2 className='text-text-secondary text-md'/>
            <p className='text-md grow text-text-secondary select-none overflow-hidden'>{ListObj?.title}</p>
        </div>
        <BsThreeDots onClick = {() => setOpenDropDown(true)} className='text-text-secondary hover:text-text-danger cursor-pointer text-md'/>

        {openDropdown && <Dropdown dropDownPackages={dropDownPackage} offset={dropDownOffset} closeHandler={() => setOpenDropDown(false)}/>}
    
        {openModal && 
        <GenericModal handleClose={() => setOpenModal(false)}>
          <DeleteList ListObj={ListObj} closeHandler = {() => setOpenModal(false)}/>
        </GenericModal>
        }
    </div>
  )
}

export default ListBranch