import React, { useEffect, useState } from "react";
import {FiEdit} from 'react-icons/fi'
import {AiFillDelete, AiFillSave} from 'react-icons/ai'
import {MdCancel} from 'react-icons/md'
import { IArticle } from "../interfaces/DataInterfaces";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import DocPath from "./DocPath";
import { getSourceTitleFromId } from "../helper/dataHelpers";
import { createArticleViewModel } from "../viewModels/createArticleViewModel";
import { RDX_updateArticle } from "../redux/slices/articleSlice";

function ArticleView() {

  const curArticle : IArticle = useAppSelector((state) => state.applicationState.selectedArticle) as IArticle
  const docPath : string[] = [getSourceTitleFromId(curArticle?.source), curArticle?.title];
  
  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<createArticleViewModel>({
    title : curArticle.title,
    content : curArticle.content,
    source : curArticle.source
  })

  const dispatch = useAppDispatch();

  const titleClass : string = `p-1 outline-none border-none rounded-md w-full ${enableEdit ? "bg-slate-lightdark " : "bg-slate-dark "} text-2xl font-bold text-text-main`
  const contentClass : string = `p-1 outline-none w-full h-full resize-none border-none rounded-md ${enableEdit ? "bg-slate-lightdark " : "bg-slate-dark "} text-sm leading-loose text-text-main`
  
  // onChange : Handles input change and updates formData
  const onChange = (e : any) => {
    setFormData((prevState : createArticleViewModel) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  // onEditSubmit : Handles submitting the form (Edit)
  const onEditSubmit = (e : any) => {
    e.preventDefault();

    // Create new Source Object
    const updatedArticle : IArticle = {
      ...curArticle,
      title : formData.title,
      content : formData.content
    };

    dispatch(RDX_updateArticle(updatedArticle));
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
           <AiFillSave onClick = {onEditSubmit} className="text-lg text-text-secondary cursor-pointer hover:text-[#9fb0e7]"/>
           <MdCancel onClick = {onCancel} className="text-lg text-text-secondary cursor-pointer hover:text-text-danger"/>
          </>
          : 
          <>
           <FiEdit onClick = {() => setEnableEdit(true)} className="text-lg text-text-secondary cursor-pointer hover:text-[#9fb0e7]"/>
            <AiFillDelete className="text-lg text-text-secondary cursor-pointer hover:text-text-danger"/>
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

          <div className="w-full grow max-h-[75vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-lightdark scrollbar-track-slate-super-dark">
            <textarea 
                    name="content"
                    disabled = {!enableEdit}
                    onChange = {onChange}
                    className={contentClass}
                    value={formData.content}
            />
          </div>


        </div>

        {/* Right Panel (Stats and Mode Controls) */}
        <div className="flex flex-col max-w-[200px] min-w-[150px] h-full">

          <div className="flex w-full flex-col space-y-2">
            <div className="flex flex-row justify-between w-full">
              <p className="text-xs text-text-secondary">Word Count</p>
              <p className="text-xs text-text-secondary">24</p>
            </div>
            <div className="flex flex-row justify-between w-full">
              <p className="text-xs text-text-secondary">Words Saved</p>
              <p className="text-xs text-text-secondary">12</p>
            </div>
            <div className="flex flex-row justify-between w-full">
              <p className="text-xs text-text-secondary">Comprehension</p>
              <p className="text-xs text-text-secondary">50%</p>
            </div>
            <div className="flex flex-row justify-between w-full">
              <p className="text-xs text-text-secondary">Created At</p>
              <p className="text-xs text-text-secondary">12/03/2034</p>
            </div>
            <div className="flex flex-row justify-between w-full">
              <p className="text-xs text-text-secondary">Updated At</p>
              <p className="text-xs text-text-secondary">15/03/2034</p>
            </div>
          </div>

          <div>
            {/* Associated Word Lists (Beyond MVP) */}
          </div>

        </div>

      </div>
    </div>
    
    
    </>

  );
}

export default ArticleView;
