import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import { useClickOutside } from '../../helper/UIHelpers'
import { IDropDownPackage } from '../../interfaces/IDropDownPackage'
import { IFloatingMenuData, ITextPosition } from '../../interfaces/IFloatingMenuData'
import FloatingMenuOption from './FloatingMenuOption'
import {RiTranslate} from 'react-icons/ri'
import {IoMdAdd} from 'react-icons/io'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setFloatingMenuOpen, setSelectedText, setSelectionPosition } from '../../redux/slices/applicationSlice'
import { IArticle, IList } from '../../interfaces/DataInterfaces'
import { RDX_createList } from '../../redux/slices/listSlice'
import { getListFromListId, getListFromTitle, listNameTaken } from '../../helper/dataHelpers'
import { RDX_updateArticle } from '../../redux/slices/articleSlice'
import { RDX_createItem } from '../../redux/slices/itemSlice'
import { createItemViewModel } from '../../viewModels/createItemViewModel'
import { translateText } from '../../services/translationService'
import { BsArrowRight } from 'react-icons/bs'
import { Ping } from '@uiball/loaders'

interface Props {
    closeHandler? : any,
}

function FloatingActionMenu({closeHandler} : Props) {

    const isOpen : boolean = useAppSelector((state) => state.applicationState.floatingMenuOpen);
    const curArticle : IArticle = useAppSelector((state) => state.applicationState.selectedArticle) as IArticle;
    const selectedText : string = useAppSelector((state) => state.applicationState.selectedText) as string;
    const position : DOMRect = useAppSelector((state) => state.applicationState.selectionPosition) as DOMRect;

    const dispatch = useAppDispatch();
    const [translation, setTranslation] = useState<any>(null);

    const offsetStyle = {top : position?.top + 30, bottom : position?.bottom , left : position?.left , right : position?.right }

    const clearFloatingStateRDX = () => {
        dispatch(setFloatingMenuOpen(false))
        dispatch(setSelectedText(""));
        dispatch(setSelectionPosition({} as ITextPosition))
        setTranslation(null);
    }

    const domNode = useClickOutside(() => {
        clearFloatingStateRDX();
    });

    // onAddToList : Handles user selecting add to list
    const onAddToList = async () => {

        const def : string = translation?.translatedText && translation?.valid ? translation?.translatedText : "No Definition"

        // Check if article has an associated list (Create one if not)
        if(!curArticle?.associatedList || !getListFromListId(curArticle?.associatedList))
        {
            // Create designated list or search for an existing one
            const associatedListName : string = `${curArticle.title} Vocab`

            if(!listNameTaken(associatedListName))
            {
                await dispatch(RDX_createList({
                    title : associatedListName,
                    source : curArticle.source,
                }))
            }

            const tgtList : IList = getListFromTitle(associatedListName);

            // Assign current article to be associated with the new list
            await dispatch(RDX_updateArticle({
                ...curArticle,
                associatedList : tgtList._id,
            }))

            // Add currently selected word to associated list
            let newItem : createItemViewModel = {
                title : selectedText,
                definition : def,
                pronunciation : "No Pronunciation",
                list : tgtList._id,
            }
            
            await dispatch(RDX_createItem(newItem))
        }
        else 
        {
            console.log(curArticle?.associatedList)
            // Add currently selected word to associated list
            let newItem : createItemViewModel = {
                title : selectedText,
                definition : def,
                pronunciation : "No Pronunciation",
                list : curArticle?.associatedList,
            }

            console.log(newItem)
            
            await dispatch(RDX_createItem(newItem))
        }

        clearFloatingStateRDX();

    }

    const onTranslate = async () => 
    {
        const translationRes = await translateText(selectedText, 'zh', 'en');
        
        if(!translationRes){
            setTranslation({
                ...translationRes,
                valid : false,
            })
            return
        } 

        setTranslation({
            ...translationRes,
            valid : true,
        })
    }

    useEffect(() => {
        onTranslate();
    }, [selectedText])

    const dropdownPackages : IDropDownPackage[] = [
        {Icon : IoMdAdd, ActionTitle : "Add to List", ActionFunction : onAddToList},
    ]


    if(!isOpen) return null;

  return ReactDom.createPortal(
    <>
    <div
        ref = {domNode}
        style = {offsetStyle} 
        className='flex flex-col p-3 w-[180px] min-h-[150px] max-h-[200px] bg-slate-black absolute rounded-md'>
        <div className='flex justify-between items-center pb-3 mb-3 w-full min-h-[45px] overflow-scroll scrollbar-thin border-b-2 border-slate-lightdark'>
            <p className='text-md select-none text-text-main leading-tight'>{selectedText}</p>
            {
                translation == null ? 
                (
                    <>
                        <BsArrowRight className='text-lg select-none text-text-main'/>
                        <Ping size={20} color={"#FFF"}/>
                    </>
                ) 
                : translation?.valid == true ? 
                (
                    <>
                     <BsArrowRight className='text-lg select-none text-text-main'/>
                    <div className='flex flex-col'>
                        <p className='text-sm select-none text-text-main leading-tight'>{translation.translatedText}</p>
                        <p className='text-sm slect-none text-text-main leading-tight'>{`(${translation.match * 100}%)`}</p>
                    </div>
                    </>
                ) 
                :
                (<></>) 

            }
           
        </div>
            {dropdownPackages.map(({Icon, ActionTitle, ActionFunction} : IDropDownPackage, index : number) => (
                <FloatingMenuOption key={index} DropdownPackage={{Icon, ActionTitle, ActionFunction}}/>
            ))}
    </div>
    
    </>,
    document.getElementById("portal")!
  )
}

export default FloatingActionMenu