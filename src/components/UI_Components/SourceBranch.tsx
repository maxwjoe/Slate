import React, {useState} from 'react'
import {AiOutlineCaretDown, AiOutlineCaretRight} from 'react-icons/ai'
import {FiEdit} from 'react-icons/fi'
import {AiFillDelete} from 'react-icons/ai'
import {BsThreeDots} from 'react-icons/bs'
import {RiArticleLine, RiListCheck2} from 'react-icons/ri'
import Dropdown from '../Modals/Dropdown'
import { IDropDownPackage } from '../../interfaces/IDropDownPackage'
import {getComponentBounds, applyShift} from '../../helper/UIHelpers'
import GenericModal from '../Modals/GenericModal'
import EditSource from '../CRUD_Components/EditSource'
import DeleteSource from '../CRUD_Components/DeleteSource'
import {IArticle, IList, ISource} from '../../interfaces/DataInterfaces'
import CreateArticle from '../CRUD_Components/CreateArticle'
import CreateList from '../CRUD_Components/CreateList'
import { useAppSelector } from '../../redux/hooks'
import ArticleBranch from './ArticleBranch'
import ListBranch from './ListBranch'


interface Props {
    SourceObj : ISource;
}


// SourceBranch : Renders Source in Left Tree, has Toggle Functionality
function SourceBranch({SourceObj} : Props) {

    const [open, setOpen] = useState<boolean>(false);
    const [openDropDown, setOpenDropDown] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedModal, setSelectedModal] = useState<string>("None");

    const selectedList : IList = useAppSelector((state) => state.applicationState.selectedList) as IList;
    const selectedArticle : IArticle = useAppSelector((state) => state.applicationState.selectedArticle) as IArticle;
    const selectedSubSourceId : string = selectedList?._id || selectedArticle?._id;


    const SourceArticles = useAppSelector((state) => state.articles.articles).filter((article : IArticle) => article.source === SourceObj._id);
    const SourceLists = useAppSelector((state) => state.lists.lists).filter((list :IList) => list.source === SourceObj._id);

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
        {Icon : RiArticleLine, ActionTitle : "New Article", ActionFunction : () => {handleMenuSelect(); setSelectedModal("Add Article")}},
        {Icon : RiListCheck2, ActionTitle : "New Vocab List", ActionFunction : () => {handleMenuSelect(); setSelectedModal("Add List")}},
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
            case "Add List":
                return <CreateList closeHandler = {() => setOpenModal(false)} SourceId = {SourceObj._id}/>
            default :
                return null
        }
    }   


  return (
    <>
        <div id={SourceObj.title}  className='flex items-center relative justify-between space-x-3 pr-2 pl-2 w-full h-[35px] min-h-[35px] rounded-md hover:bg-slate-lightdark'>
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
                return <ArticleBranch key = {index} ArticleObj = {article} isSelected={article._id === selectedSubSourceId}/>
            })}
            {SourceLists.map((list : IList, index : number) => {
                return <ListBranch key = {index} ListObj = {list} isSelected={list._id === selectedSubSourceId}/>
            })}
        </div>
    }
    </>
  )
}

export default SourceBranch