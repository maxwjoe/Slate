import React, { useEffect, useState } from 'react'
import { IItem, IList } from '../interfaces/DataInterfaces'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import {BsSearch} from 'react-icons/bs'
import {IoMdAdd} from 'react-icons/io'
import ItemDefinitionView from './ItemDefinitionView'
import { RDX_getItems } from '../redux/slices/itemSlice'
import GenericModal from '../modals/GenericModal'
import CreateItem from './CRUD Modals/CreateItem'
import ListItem from './ListItem'
import { getItemsFromListId } from '../helper/dataHelpers'
import { setSelectedItem } from '../redux/slices/applicationSlice'

function ListView() {

  const curList : IList = useAppSelector((state) => state.applicationState.selectedList) as IList;
  const curListItems : IItem[] = getItemsFromListId(curList?._id);

  const [createItemModal, setCreateItemModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  // onAdd : Handles user clicking add item
  const onAdd = () => {

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

      <div className='flex grow bg-text-danger'>

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