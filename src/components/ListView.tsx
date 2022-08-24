import React, { useEffect, useState } from 'react'
import { IItem, IList } from '../interfaces/DataInterfaces'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import {BsSearch} from 'react-icons/bs'
import {IoMdAdd} from 'react-icons/io'
import ItemDefinitionView from './ItemDefinitionView'
import { RDX_getItems, RDX_updateItem } from '../redux/slices/itemSlice'
import GenericModal from '../modals/GenericModal'
import CreateItem from './CRUD Modals/CreateItem'
import ListItem from './ListItem'
import { getItemsFromListId } from '../helper/dataHelpers'
import { setSelectedItem } from '../redux/slices/applicationSlice'
import DocPath from './DocPath'
import { AiFillDelete, AiFillSave } from 'react-icons/ai'
import { MdCancel } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import { createItemViewModel } from '../viewModels/createItemViewModel'
import { reset as resetApplicationState } from '../redux/slices/applicationSlice'

function ListView() {

  const curList : IList = useAppSelector((state) => state.applicationState.selectedList) as IList;
  const curListItems : IItem[] = getItemsFromListId(curList?._id);
  const curItem : IItem = useAppSelector((state) => state.applicationState.selectedItem) as IItem;
  const dispatch = useAppDispatch();

  if(!curItem)
  {
    dispatch(setSelectedItem(curListItems?.[0]));
  }

  const [createItemModal, setCreateItemModal] = useState<boolean>(false);
  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  const [deleteItemModal, setDeleteItemModal] = useState<boolean>(false);

  const [formData, setFormData] = useState<createItemViewModel>({
    title : curItem?.title as string,
    definition : curItem?.definition as string,
    pronunciation : curItem?.pronunciation as string,
    list : curList._id
  })

  console.log(formData)


  const docPath : string[] = ["test", "test", "test"];
  const titleClass : string = `p-1 outline-none border-none rounded-md w-full ${enableEdit ? "bg-slate-lightdark " : "bg-slate-dark "} text-2xl font-bold text-text-main`
  const contentClass : string = `p-1 outline-none w-full h-full resize-none border-none rounded-md ${enableEdit ? "bg-slate-lightdark " : "bg-slate-dark "} text-sm leading-loose text-text-main`
  


  // onAdd : Handles user clicking add item
  const onAdd = () => {

  }

  // onChange : Handles input change and updates formData
  const onChange = (e : any) => {
    setFormData((prevState : createItemViewModel) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  // onEditSubmit : Handles submitting the form (Edit)
  const onEditSubmit = (e : any) => {
    e.preventDefault();

    // Create new Item
    const updatedItem : IItem= {
      ...curItem,
      title : formData.title,
      definition : formData.definition,
      pronunciation : formData.pronunciation
    };

    
    dispatch(RDX_updateItem(updatedItem));
    dispatch(setSelectedItem(updatedItem));
    setEnableEdit(false);
  }

  // onCancel : Handles the user pressing cancel when editing 
  const onCancel = () => {
    setFormData((prevState : createItemViewModel) => ({
      ...prevState,
      title : curItem.title,
      definition : curItem.definition,
      pronunciation : curItem.pronunciation,
    }))
    setEnableEdit(false);
  }

  // onDelete : Handles the user pressing confirm delete
  const onDelete = () => {
    setDeleteItemModal(false);
    dispatch(resetApplicationState())
  }

  useEffect(() => {

    dispatch(RDX_getItems())

  }, [curList])

  return (
    <div className="flex w-full h-full">

      {/* Items Panel  */}
      <div className='flex flex-col w-1/4 h-full p-2'>
        {/* Search and add */}
        <div className='flex justify-between items-center h-8'>
          <div className='flex pl-1 pr-1 space-x-1 items-center grow mr-2 h-full bg-slate-lightdark rounded-md'>
            <BsSearch className='w-3 h-3 text-text-secondary'/>
            <input className='flex text-sm h-full w-4/5 outline-none bg-slate-lightdark text-text-secondary' type="text" placeholder = {`Search "${curList.title}"`}/>
          </div>

          <div onClick={() => setCreateItemModal(true)} className='flex w-7 h-7 rounded-md items-center justify-center bg-[#4f9df6] cursor-pointer'>
            <IoMdAdd  className='w-5 h-5'/>
          </div>
        </div>


        <div className='flex items-center justify-start p-3 w-full h-12'>
          <p className='text-lg text-text-secondary'>{curList.title}</p>
        </div>

        <div>
          {curListItems.map((item : IItem, index : number) => {
            return (
              <>
              <div onClick = {() => dispatch(setSelectedItem(item))}>
                <ListItem key={index} ItemObj = {item}/>
              </div>
              </>
            )
          })}
        </div>

      </div>

      <div className='flex grow'>
        <div className="flex flex-col w-full h-full">
        <div className="flex w-full h-12">
          <DocPath Path={docPath}/>
          <div className="flex items-center justify-end space-x-3 pr-6 h-full w-1/2">
            {enableEdit ? 
            <>
            <AiFillSave onClick = {onEditSubmit} className="text-lg text-text-secondary cursor-pointer hover:text-[#9fb0e7]"/>
            <MdCancel onClick = {onCancel} className="text-lg text-text-secondary cursor-pointer hover:text-text-danger"/>
            </>
            : 
            <>
            <FiEdit onClick = {() => setEnableEdit(true)} className="text-lg text-text-secondary cursor-pointer hover:text-[#9fb0e7]"/>
              <AiFillDelete onClick = {() => setDeleteItemModal(true)} className="text-lg text-text-secondary cursor-pointer hover:text-text-danger"/>
            </>
            }
          </div>
        </div>
      <div className="flex flex-row w-full h-full bg-slate-dark pl-5 pr-5 pt-2 ">
        
        {/* Main Panel (Content) */}
        <div className="flex flex-col grow pr-6">

          <div className="w-full h-12">
            <input 
                  type="text" 
                  name="title"
                  disabled={!enableEdit}
                  onChange = {onChange}
                  className = {titleClass}
                  value={"Word"} />
          </div>
          <div className='w-full h-12'>
            <input 
                  type="text" 
                  name="title"
                  disabled={!enableEdit}
                  onChange = {onChange}
                  className = {contentClass}
                  value={"Pronunciation"} />
          </div>

          <div className="w-full grow max-h-[75vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-lightdark scrollbar-track-slate-super-dark">
            <textarea 
                    name="content"
                    disabled = {!enableEdit}
                    onChange = {onChange}
                    className={contentClass}
                    value={"Definition"}
            />
          </div>

        </div>

        </div>

      </div>
    </div>

      {
        createItemModal && 
        <GenericModal handleClose = {() => setCreateItemModal(false)}>
          <CreateItem closeHandler={() => setCreateItemModal(false)} list = {curList}/>
        </GenericModal>
      }

    </div>
  )
}

export default ListView