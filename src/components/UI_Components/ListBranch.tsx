import React, { useState } from 'react'
import {RiArticleLine, RiListCheck2} from 'react-icons/ri'
import {BsThreeDots} from 'react-icons/bs'
import { IArticle, IList } from '../../interfaces/DataInterfaces'
import Dropdown from '../Modals/Dropdown'
import {AiFillDelete} from 'react-icons/ai'
import { IDropDownPackage } from '../../interfaces/DropdownPackageInterface'
import { applyShift, getComponentBounds } from '../../helper/UIHelpers'
import GenericModal from '../Modals/GenericModal'
import DeleteList from '../CRUD_Components/DeleteList'
import {setSelectedList} from '../../redux/slices/applicationSlice'
import { useAppDispatch } from '../../redux/hooks'
import EditList from '../CRUD_Components/EditList'
import { FiEdit } from 'react-icons/fi'
import { getCurrentTheme } from '../../services/themeService'

interface Props {
  ListObj : IList;
  isSelected? : boolean;
}

// ListBranch : Component responsible for rendering the list clickable option in the option tree (RHS Panel of UI)
function ListBranch({ListObj, isSelected} : Props) {

  // --- React State ---
  const [openDropdown, setOpenDropDown] = useState<boolean>(false);
  const [openDeleteModal, setopenDeleteModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [selectedModal, setSelectedModal] = useState<string>("None"); //TODO: Delete This?
  
  // --- Redux Hooks ---
  const dispatch = useAppDispatch();


  // --- Functions ---

  // handleDropdownDelete : Passed to dropdown menu to handle modal logic
  const handleDropdownDelete = () => {
    setOpenDropDown(false);
    setopenDeleteModal(true);
  }

  // handleDropdownEdit : Passed to dropdown menu to handle modal logic
  const handleDropdownEdit = () => {
    setOpenDropDown(false);
    setOpenEditModal(true);
  }

    // handleSelect : Handles selecting the article (When the user clicks on it)
    const handleSelect = () => {
      dispatch(setSelectedList(ListObj));
    }
  
    //TODO: Delete This?
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


  // --- Constants ---
  const selectionColor : string = getCurrentTheme().accent;
  const dropDownPackage : IDropDownPackage[] = [
    {Icon : FiEdit, ActionTitle : `Edit "${ListObj.title}"`, ActionFunction : handleDropdownEdit},
    {Icon : AiFillDelete, ActionTitle : `Delete "${ListObj.title}"`, ActionFunction : handleDropdownDelete}
  ];
  const sourceLocation = getComponentBounds(ListObj.title);
  const dropDownOffset = {
      l : applyShift(sourceLocation?.left, 175),
      r : applyShift(sourceLocation?.right, 'auto'),
      t : applyShift(sourceLocation?.top, 24),
      b : applyShift(sourceLocation?.bottom, 'auto')
  }


  return (
    <div id={ListObj.title} style={isSelected ? {background : selectionColor} : {}} className={`flex items-center justify-start w-full h-9 pr-2 pl-8 rounded-md ${isSelected ? "text-text-main" : "hover:bg-slate-lightdark rounded-md text-text-secondary"}`}>
        <div onClick = {handleSelect} className='flex grow justify-start space-x-1 items-center cursor-pointer'>
            <RiListCheck2 className='text-md'/>
            <p className='text-md  select-none max-w-[90px] overflow-hidden whitespace-nowrap'>{ListObj?.title}</p>
        </div>
        <BsThreeDots onClick = {() => setOpenDropDown(true)} className=' cursor-pointer text-md'/>

        {openDropdown && <Dropdown dropDownPackages={dropDownPackage} offset={dropDownOffset} closeHandler={() => setOpenDropDown(false)}/>}
    
        {openDeleteModal && 
        <GenericModal handleClose={() => setopenDeleteModal(false)}>
          <DeleteList ListObj={ListObj} closeHandler = {() => setopenDeleteModal(false)}/>
        </GenericModal>
        }

        {openEditModal && 
        <GenericModal handleClose={() => setOpenEditModal(false)}>
          <EditList ListObj={ListObj} closeHandler = {() => setOpenEditModal(false)}/>
        </GenericModal>
        }

    </div>
  )
}

export default ListBranch