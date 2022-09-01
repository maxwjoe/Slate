import React, { useEffect, useState } from 'react'
import { getAllListsInSource, getListFromListId, getSourceFromId } from '../../helper/dataHelpers';
import { IArticle, IList, ISource } from '../../interfaces/DataInterfaces';
import { IOption } from '../../interfaces/OptionInterface';
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setSelectedArticle } from '../../redux/slices/applicationSlice';
import { RDX_updateArticle } from '../../redux/slices/articleSlice';
import DropdownSelector from '../Other/DropdownSelector'

function ArticleListDisplay() {

    // --- Redux State ---
    const curArticle : IArticle = useAppSelector((state) => state.applicationState.selectedArticle) as IArticle;
    const associatedList : IList = getListFromListId(curArticle?.associatedList as string) as IList;
    const sourceLists : IList[] = getAllListsInSource(curArticle?.source as string);

    // --- Redux Hooks ---
    const dispatch = useAppDispatch();

    // --- Constants ---
    const dropDownOptions : IOption[] = []
    for(let i = 0 ; i < sourceLists.length ; i++)
    {
        dropDownOptions.push({
            disp : sourceLists[i].title,
            real : sourceLists[i]._id,
        })
    }

    // --- Functions ---

    // changeAssociatedList : Handles changing the article's associated list
    const changeAssociatedList = async (newListId : string) => {

        
        const updatedArticle : IArticle = {
            ...curArticle,
            associatedList : newListId,
        }
        await dispatch(RDX_updateArticle(updatedArticle))

        dispatch(setSelectedArticle(updatedArticle))

    }


    // --- React Hooks ---
    useEffect(() => {
    }, [curArticle, associatedList])
    

  return (
    <div className='flex flex-col space-y-3 w-full h-12'>
        <p className='text-text-main text-sm'>Connected List</p>
        <DropdownSelector options={dropDownOptions} defaultSelection = {associatedList?.title} selectionFunction = {() => {}}/>
    </div>
  )
}

export default ArticleListDisplay