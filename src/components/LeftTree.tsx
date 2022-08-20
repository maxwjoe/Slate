import React from 'react'
import SourceBranch from './SourceBranch'
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { ISource } from '../interfaces/DataInterfaces';


function LeftTree() {

  // Get Sources from Redux
  const {sources} = useAppSelector((state) => state.sources)
  const userSources : ISource[] = sources['sources'];


  return (
    <div className='min-w-[215px] bg-slate-super-dark h-full'>
        <div 
            style={{scrollbarGutter : 'auto'}}
            className='flex flex-col w-full max-h-[85vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-lightdark scrollbar-track-slate-super-dark overflow-x-hidden space-y-3 p-3'
        >

          {
            userSources?.length ? 
              userSources?.map((source : ISource, index : number) => (
                <SourceBranch key = {index} SourceObj = {source}/>
              )) 
              : 
              <>
              <div className='flex w-full h-full justify-center items-center'>
                <p className='text-sm text-text-secondary'>No Sources</p>
              </div>
              </>
          }
       
     
        </div>
    </div>
  )
}

export default LeftTree