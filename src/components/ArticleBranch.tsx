import React, { useState } from 'react'
import {RiArticleLine, RiListCheck2} from 'react-icons/ri'
import {BsThreeDots} from 'react-icons/bs'
import { IArticle, IList } from '../interfaces/DataInterfaces'
import Dropdown from '../modals/Dropdown'
import {AiFillDelete} from 'react-icons/ai'
import { IDropDownPackage } from '../interfaces/IDropDownPackage'
import { applyShift, getComponentBounds } from '../helper/positionHelpers'
import GenericModal from '../modals/GenericModal'
import DeleteArticle from './CRUD Modals/DeleteArticle'
import { useAppDispatch } from '../redux/hooks'
import {setSelectedArticle} from '../redux/slices/applicationSlice'

interface Props {
  ArticleObj : IArticle;
}


function ArticleBranch({ArticleObj} : Props) {

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
    dispatch(setSelectedArticle(ArticleObj));
  }
  
  const dropDownPackage : IDropDownPackage[] = [
    {Icon : AiFillDelete, ActionTitle : `Delete "${ArticleObj.title}"`, ActionFunction : handleDropdownDelete}
  ];

  const sourceLocation = getComponentBounds(ArticleObj.title);

  const dropDownOffset = {
      l : applyShift(sourceLocation?.left, 175),
      r : applyShift(sourceLocation?.right, 'auto'),
      t : applyShift(sourceLocation?.top, 24),
      b : applyShift(sourceLocation?.bottom, 'auto')
  }


  return (
    <div id={ArticleObj.title} className='flex items-center justify-start w-full h-8 pr-2 pl-8 hover:bg-slate-lightdark rounded-md whitespace-nowrap overflow-hidden'>
        <div onClick = {handleSelect} className='flex grow justify-start space-x-1 items-center cursor-pointer'>
            <RiArticleLine className='text-text-secondary text-md'/>
            <p className='text-md text-text-secondary select-none max-w-[90px] overflow-hidden whitespace-nowrap'>{ArticleObj?.title}</p>
        </div>
        <BsThreeDots onClick = {() => setOpenDropDown(true)} className='text-text-secondary hover:text-text-danger cursor-pointer text-md'/>

        {openDropdown && <Dropdown dropDownPackages={dropDownPackage} offset={dropDownOffset} closeHandler={() => setOpenDropDown(false)}/>}
    
        {openModal && 
        <GenericModal handleClose={() => setOpenModal(false)}>
          <DeleteArticle ArticleObj={ArticleObj} closeHandler = {() => setOpenModal(false)}/>
        </GenericModal>
        }
    </div>
  )
}

export default ArticleBranch