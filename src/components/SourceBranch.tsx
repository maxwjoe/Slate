import React, {useState} from 'react'
import {AiOutlineCaretDown, AiOutlineCaretRight} from 'react-icons/ai'
import {FiEdit} from 'react-icons/fi'
import {AiFillDelete} from 'react-icons/ai'
import {BsThreeDots} from 'react-icons/bs'
import {RiArticleLine} from 'react-icons/ri'
import Dropdown from '../modals/Dropdown'
import { IDropDownPackage } from '../interfaces/IDropDownPackage'
import {getComponentBounds, applyShift} from '../helper/positionHelpers'
import GenericModal from '../modals/GenericModal'
import EditSource from './CRUD Modals/EditSource'
import DeleteSource from './CRUD Modals/DeleteSource'
import {IArticle, ISource} from '../interfaces/DataInterfaces'
import CreateArticle from './CRUD Modals/CreateArticle'
import { useAppSelector } from '../redux/hooks'
import ArticleBranch from './ArticleBranch'


interface Props {
    SourceObj : ISource;
}


// SourceBranch : Renders Source in Left Tree, has Toggle Functionality
function SourceBranch({SourceObj} : Props) {

    const [open, setOpen] = useState<boolean>(false);
    const [openDropDown, setOpenDropDown] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedModal, setSelectedModal] = useState<string>("None");

    const SourceArticles = useAppSelector((state) => state.articles).articles.filter((article : IArticle) => article.source === SourceObj._id);


    // handleToggle : Handles opening and closing the source
    const handleToggle = () => {
        setOpen(!open);
    }

    // handleMenuSelect : Handles selecting an object (opens the modal AND closes the dropdown)
    const handleMenuSelect = () => {
        setOpenDropDown(false);
        setOpenModal(true);
    }

    const sourceLocation = getComponentBounds(SourceObj.title);

    const dropDownOffset = {
        l : applyShift(sourceLocation?.left, 175),
        r : applyShift(sourceLocation?.right, 'auto'),
        t : applyShift(sourceLocation?.top, 24),
        b : applyShift(sourceLocation?.bottom, 'auto')
    }

    // Dropdown packages for options menu
    const DropDownPackages : IDropDownPackage[] = [
        {Icon : FiEdit, ActionTitle : "Edit", ActionFunction : () => {handleMenuSelect(); setSelectedModal("Edit") }},
        {Icon : AiFillDelete, ActionTitle : "Delete", ActionFunction : () => {handleMenuSelect(); setSelectedModal("Delete")}},
        {Icon : RiArticleLine, ActionTitle : "New Article", ActionFunction : () => {handleMenuSelect(); setSelectedModal("Add Article")}}
    ]

    // renderCRUDModal : Return correct CRUD Modal (Could Make this generic and import it ? )
    const renderCRUDModal = (modalName : string) => {
        switch(modalName)
        {
            case "Edit" :
                return <EditSource closeHandler = {() => setOpenModal(false)} SourceObj={SourceObj}/>
            case "Delete" :
                return <DeleteSource closeHandler = {() => setOpenModal(false)} SourceObj = {SourceObj}/>
            case "Add Article" : 
                return <CreateArticle closeHandler = {() => setOpenModal(false)} SourceId = {SourceObj._id}/>
            default :
                return null
        }
    }   


  return (
    <>
        <div id={SourceObj.title}  className='flex items-center relative justify-between space-x-3 pr-2 pl-2 w-full h-8 rounded-md hover:bg-slate-lightdark'>
            <div onClick = {handleToggle} className='flex justify-start space-x-2 items-center'>
                {open ? <AiOutlineCaretDown className='text-text-secondary text-md cursor-pointer'/> : <AiOutlineCaretRight className='text-text-secondary text-md cursor-pointer'/>}
                <p className='text-md text-text-secondary cursor-default select-none'>{SourceObj.title}</p>
            </div>

            <BsThreeDots onClick={() => setOpenDropDown(true)} className='text-text-secondary cursor-pointer text-md'/>
            

                {openDropDown && 
                    <Dropdown dropDownPackages={DropDownPackages} offset = {dropDownOffset} closeHandler={() => setOpenDropDown(false)}/>
                }
                {
                 openModal && (
                    <GenericModal handleClose={() => setOpenModal(false)}>
                        {renderCRUDModal(selectedModal)}
                    </GenericModal>
                 )
                }
        </div>

    {open && 
        <div className='flex flex-col space-y-3 items-end justify-center w-full'>
            {SourceArticles.map((article : IArticle, index : number) => {
                return <ArticleBranch key = {index} ArticleObj = {article}/>
            })}
        </div>
    }
    </>
  )
}

export default SourceBranch