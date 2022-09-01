import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import { getFloatingActionMenuOffset, useClickOutside } from '../../helper/UIHelpers'
import { IDropDownPackage } from '../../interfaces/DropdownPackageInterface'
import { IFloatingMenuData, ITextPosition } from '../../interfaces/FloatingMenuDataInterface'
import FloatingMenuOption from './FloatingMenuOption'
import {RiTranslate} from 'react-icons/ri'
import {IoMdAdd} from 'react-icons/io'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setFloatingMenuOpen, setSelectedArticle, setSelectedText, setSelectionPosition } from '../../redux/slices/applicationSlice'
import { IArticle, IList } from '../../interfaces/DataInterfaces'
import { RDX_createList } from '../../redux/slices/listSlice'
import { getListFromListId, getListFromTitle, getSourceLanguageFromId, listNameTaken } from '../../helper/dataHelpers'
import { RDX_updateArticle } from '../../redux/slices/articleSlice'
import { RDX_createItem } from '../../redux/slices/itemSlice'
import { createItemViewModel } from '../../viewModels/createItemViewModel'
import { translateText } from '../../services/translationService'
import { BsArrowRight } from 'react-icons/bs'
import { Ping } from '@uiball/loaders'
import toast from 'react-hot-toast'

interface Props {
    closeHandler? : any,
}

// FloatingActionMenu : Component responsible for rendering and handling user interactions with the floating menu shown on highlighting text
function FloatingActionMenu({closeHandler} : Props) {

    // --- Redux State
    const isOpen : boolean = useAppSelector((state) => state.applicationState.floatingMenuOpen);
    const curArticle : IArticle = useAppSelector((state) => state.applicationState.selectedArticle) as IArticle;
    const selectedText : string = useAppSelector((state) => state.applicationState.selectedText) as string;
    const position : ITextPosition = useAppSelector((state) => state.applicationState.selectionPosition) as ITextPosition;
    const sourceLanguage : string = getSourceLanguageFromId(curArticle?.source as string);

    // --- Redux Hooks ---
    const dispatch = useAppDispatch();

    // --- React State ---
    const [translation, setTranslation] = useState<any>(null);

    // --- Constants ---
    const offsetStyle = getFloatingActionMenuOffset(position);

    // --- Functions ---

    // clearFloatingStateRDX : Clears all states associated with floating action menu
    const clearFloatingStateRDX = () => {
        dispatch(setFloatingMenuOpen(false))
        dispatch(setSelectedText(""));
        dispatch(setSelectionPosition({} as ITextPosition))
        setTranslation(null);
    }

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

            // Check a valid list was found
            if(!tgtList?._id) {
                toast.error("Could not create associated list");
                return;
            }

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
            
            dispatch(setSelectedArticle({...curArticle, associatedList : tgtList._id}))
        }
        else 
        {
            // Add currently selected word to associated list
            let newItem : createItemViewModel = {
                title : selectedText,
                definition : def,
                pronunciation : "No Pronunciation",
                list : curArticle?.associatedList,
            }

            
            await dispatch(RDX_createItem(newItem))
        }

        clearFloatingStateRDX();
    }

    const onTranslate = async () => 
    {
        const translationRes = await translateText(selectedText, sourceLanguage, 'en');
        
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


    // --- Custom Hooks ---
    const domNode = useClickOutside(() => {
        clearFloatingStateRDX();
    });

    // --- React Hooks ---
    useEffect(() => {
        onTranslate();
    }, [selectedText])

    const dropdownPackages : IDropDownPackage[] = [
        {Icon : IoMdAdd, ActionTitle : "Add to List", ActionFunction : onAddToList},
    ]

    // Handle menu not being open
    if(!isOpen) return null;

  return ReactDom.createPortal(
    <>
    <div
        ref = {domNode}
        style = {offsetStyle} 
        className='flex flex-col p-3 w-[180px] h-[180px] bg-slate-super-dark absolute rounded-md'>
        <div className='flex justify-between items-center pb-3 mb-3 w-full overflow-scroll scrollbar-thin border-b-2 border-slate-lightdark'>
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