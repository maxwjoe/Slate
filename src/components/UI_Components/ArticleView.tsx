import React, { useEffect, useRef, useState } from "react";
import {FiEdit} from 'react-icons/fi'
import {AiFillDelete, AiFillSave, AiFillHighlight} from 'react-icons/ai'
import {MdCancel} from 'react-icons/md'
import { IArticle, IItem } from "../../interfaces/DataInterfaces";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import DocPath from "./DocPath";
import { getSourceTitleFromId, getArticleFromId, getItemsFromListId, getStatsFromDataObj } from "../../helper/dataHelpers";
import { createArticleViewModel } from "../../viewModels/createArticleViewModel";
import { RDX_updateArticle } from "../../redux/slices/articleSlice";
import { reset as resetApplicationState, setFloatingMenuOpen, setSelectedArticle, setSelectedText, setSelectionPosition } from "../../redux/slices/applicationSlice";
import GenericModal from "../Modals/GenericModal";
import DeleteArticle from "../CRUD_Components/DeleteArticle";
import FloatingActionMenu from "../Modals/FloatingActionMenu";
import { getCurrentTheme, SLATE_TEXT_SECONDARY } from "../../services/themeService";
import { ITheme } from "../../interfaces/ThemeInterface";
import DocStats from "./DocStats";
import { IStats } from "../../interfaces/StatsInterface";
import { IHighlightOptions } from "../../interfaces/FloatingMenuDataInterface";
import FloatingHighlightMenu from "../Modals/FloatingHighlightMenu";
import {v4 as uuidv4} from 'uuid'

// ArticleView : Component to render an article (Document) in the UI, also resonsible for CRUD operations and handling selection and highlighting text
function ArticleView() {
  
  // --- Redux State ---
  const curArticle : IArticle = useAppSelector((state) => state.applicationState.selectedArticle) as IArticle
  const selectedText : string = useAppSelector((state) => state.applicationState.selectedText) as string;
  const currentTheme : ITheme = getCurrentTheme(); //getCurrentTheme calls the Redux Store therefore is redux state
  const docPath : string[] = [getSourceTitleFromId(curArticle?.source), curArticle?.title];
  const associatedListItems : IItem[] = getItemsFromListId(curArticle?.associatedList as string);
  
  // --- Redux Hooks ---
  const dispatch = useAppDispatch();

  // --- React State ---
  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showHighlight, setShowHighlight] = useState<boolean>(true);
  const [HighlightOptions, setHighlightOptions] = useState<IHighlightOptions>({text : "", show : false});
  const [formData, setFormData] = useState<createArticleViewModel>({
    title : curArticle.title,
    content : curArticle.content,
    source : curArticle.source,
  })
  
  
  // --- Constants ---
  const titleClass : string = `p-1 outline-none border-none rounded-md w-full ${enableEdit ? "bg-slate-lightdark " : "bg-slate-dark "} text-2xl font-bold text-text-main`
  const contentClass : string = `p-1 outline-none w-full h-full resize-none border-none rounded-md ${enableEdit ? "bg-slate-lightdark " : "bg-slate-dark "} text-sm leading-loose text-text-main scrollbar-thin`
  const documentStats : IStats = getStatsFromDataObj(curArticle);
  const associatedListItemTitles : string[] = [];
  const contentContainerId : string = "contentContainer";
  const parentDims : DOMRect = document.getElementById(contentContainerId)?.getBoundingClientRect() as DOMRect;


  // --- Loose Code (TODO: Tidy Up?) ---
  for(let i = 0 ; i < associatedListItems.length ; i++)
  {
    associatedListItemTitles.push(associatedListItems[i].title);
  }


  // --- Functions ---
  
  // highlightText : returns highlighted text
  const getHighlightedText = (text : string, highlight : string[]) => {
    
    if(!showHighlight) return text;
    
    let regexMatchString : string = "";
    
    for(let i = 0 ; i < highlight.length ; i++)
    {
      regexMatchString = regexMatchString.concat(highlight[i]);
      if (i != highlight.length - 1) 
      {
        regexMatchString = regexMatchString.concat("|");
      }
    }

    // Checks if word contained within highlighted text
    const isContained = (part : string, highlight : string[]) =>
    {
      for(let i = 0 ; i < highlight.length ; i++)
      {
        if(part.toLowerCase() === highlight[i].toLowerCase()) return true;
      }
      return false;
    }

    // openHighlightMenu : Opens Highlight menu with selected text
    const openHighlightMenu = (partText : string, spanId : string) => {
      
      const spanPos : DOMRect = document.getElementById(spanId)?.getBoundingClientRect() as DOMRect;

      setHighlightOptions({
        text : partText,
        show : true,
        spanId : spanId,
        position : {
          top : spanPos.top,
          bottom : spanPos.bottom,
          left : spanPos.left,
          right : spanPos.right,
          parentHeight : parentDims.height,
          parentWidth : parentDims.width,
        },
      })
    }
    
    const parts = text.split(new RegExp(`(${regexMatchString})`, 'gi'));
    return <span> { parts.map((part, i) => {

      const isHighlighted : boolean = isContained(part, highlight);
      const spanId : string = isHighlighted ? uuidv4().toString() : "";

        return (
        <span id = {spanId} onClick={isHighlighted ? () => {openHighlightMenu(part, spanId)} : () => {}} className={`rounded-md ${isHighlighted && "cursor-pointer select-none"}`} key={i} style={isHighlighted ? { backgroundColor: currentTheme.accent } : {} }>
            { part }
        </span>)
    })
    } </span>;
}

  // handleCloseHighlightOptions : Handles closing the highlight option menu (for already highlighted words)
  const handleCloseHighlightOptions = () => {
    setHighlightOptions({
      ...HighlightOptions,
      show : false
    })
  }

  // onChange : Handles input change and updates formData
  const onChange = (e : any) => {
    setFormData((prevState : createArticleViewModel) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  // onEditSubmit : Handles submitting the form (Edit)
  const onEditSubmit = async (e : any) => {
    e.preventDefault();

    // Create new Source Object
    const updatedArticle : IArticle = {
      ...curArticle,
      title : formData.title,
      content : formData.content
    };

    
    await dispatch(RDX_updateArticle(updatedArticle));
    setEnableEdit(false);
  }
  
  // onCancel : Handles the user pressing cancel when editing 
  const onCancel = () => {
    setFormData({
      title : curArticle.title,
      content : curArticle.content,
      source : curArticle.source
    })
    setEnableEdit(false);
  }
  
  // onDelete : Handles the user pressing confirm delete
  const onDelete = () => {
    setShowDeleteModal(false);
    dispatch(resetApplicationState())
  }

  
  // highlightHandler : Handler for highlight action
  const hightlightHandler = () => {
    
    // Check validity of selection
    const sel = window.getSelection()
    if(sel === null || isNaN(sel.rangeCount)) return;
    
    // Get Selection Content and Position
    const range = sel.getRangeAt(0).cloneRange();
    const text: string = range.toString();
    const pos: DOMRect = range.getBoundingClientRect();
    
    // Send to Redux
    if(text !== "" && text!== " ")
    {
      dispatch(setSelectedText(text));
      dispatch(setFloatingMenuOpen(true));
  
      dispatch(setSelectionPosition({
        top : pos?.top,
        bottom : pos?.bottom,
        left : pos?.left,
        right : pos?.right,
        parentHeight : parentDims?.height,
        parentWidth : parentDims?.width,
      }));
    }
  }

  // --- React Hooks ---


  // useEffect Hook to update redux data layer for highlighted text and position
  useEffect(() => {
  
    document.addEventListener("mouseup", hightlightHandler)
  
    return () => {
      document.removeEventListener("mouseup", hightlightHandler)
    }
  
  }, [selectedText])
  
  // useEffect : Handles updating the rendered article when selection changes in redux
  useEffect(() => {
    setFormData({
      title : curArticle.title,
      content : curArticle.content,
      source : curArticle.source
    })
  }, [curArticle])


  return (

    <>
    <div className="flex flex-col w-full h-full">
      <div className="flex w-full h-12">
        <DocPath Path={docPath}/>
        <div className="flex items-center justify-end space-x-3 pr-6 h-full w-1/2">
          {enableEdit ? 
          <>
           <AiFillSave onClick = {onEditSubmit} className="text-lg text-text-secondary cursor-pointer hover:text-slate-accent"/>
           <MdCancel onClick = {onCancel} className="text-lg text-text-secondary cursor-pointer hover:text-text-danger"/>
          </>
          : 
          <>
          <AiFillHighlight
                          onClick = {() => setShowHighlight(!showHighlight)} 
                          style = {{color : showHighlight ? getCurrentTheme().accent : SLATE_TEXT_SECONDARY}}
                          className={`text-lg cursor-pointer`}/>
           <FiEdit onClick = {() => setEnableEdit(true)} className="text-lg text-text-secondary cursor-pointer hover:text-slate-accent"/>
            <AiFillDelete onClick = {() => setShowDeleteModal(true)} className="text-lg text-text-secondary cursor-pointer hover:text-text-danger"/>
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
                  value={formData.title} />
          </div>

          <div 
              id = {contentContainerId}  
              className="w-full grow max-h-[75vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-lightdark scrollbar-track-slate-super-dark">
              
              {
              enableEdit ? 
              (
                <textarea 
                        name="content"
                        disabled = {!enableEdit}
                        onChange = {onChange}
                        className={contentClass}
                        value={formData.content}
                />
              ) 
              : 
              (
              <p className="text-text-main whitespace-pre-wrap pr-3">
                {getHighlightedText(formData.content, associatedListItemTitles)}
              </p>

              )
              }
          </div>
        </div>
        
        {/* Display Statistics in RHS panel */}
        <DocStats stats = {documentStats}/>
        
      </div>
    </div>
    
    {
      HighlightOptions.show && (
        <FloatingHighlightMenu 
                              settings = {HighlightOptions} 
                              closeHandler = {handleCloseHighlightOptions} 
        />
      )
    }

    {showDeleteModal &&
      <GenericModal handleClose={() => setShowDeleteModal(false)}>
            <DeleteArticle ArticleObj={curArticle} closeHandler = {onDelete}/>
      </GenericModal>
    }

      <FloatingActionMenu/>
    
    </>

  );
}

export default ArticleView;
