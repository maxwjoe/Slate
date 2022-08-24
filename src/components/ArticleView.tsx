import React from "react";
import {FiEdit} from 'react-icons/fi'
import {AiFillDelete} from 'react-icons/ai'
import { IArticle } from "../interfaces/DataInterfaces";
import { useAppSelector } from "../redux/hooks";
import DocPath from "./DocPath";
import { getSourceTitleFromId } from "../helper/dataHelpers";

function ArticleView() {

  const curArticle : IArticle = useAppSelector((state) => state.applicationState.selectedArticle) as IArticle
  const docPath : string[] = [getSourceTitleFromId(curArticle?.source), curArticle?.title];

  return (

    <>
    <div className="flex flex-col w-full h-full">
      <div className="flex w-full h-12">
        <DocPath Path={docPath}/>
        <div className="flex items-center justify-end space-x-3 pr-6 h-full w-1/2">
          <FiEdit className="text-lg text-text-secondary cursor-pointer hover:text-[#9fb0e7]"/>
          <AiFillDelete className="text-lg text-text-secondary cursor-pointer hover:text-text-danger"/>
        </div>
      </div>
      <div className="flex flex-row w-full h-full bg-slate-dark pl-6 pr-6 pt-2 ">
        
        {/* Main Panel (Content) */}
        <div className="flex flex-col grow pr-6">

          <div className="w-full h-12">
            <p className="text-2xl font-bold text-text-main">{curArticle.title}</p>
          </div>

          <div className="w-full grow max-h-[75vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-lightdark scrollbar-track-slate-super-dark">
            <p className="text-sm text-text-main leading-loose">{curArticle.content}</p>
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
