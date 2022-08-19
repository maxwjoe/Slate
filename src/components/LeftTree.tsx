import React from 'react'
import SourceBranch from './SourceBranch'

function LeftTree() {
  return (
    <div className='min-w-[215px] bg-slate-super-dark h-full'>
        <div 
            style={{scrollbarGutter : 'auto'}}
            className='flex flex-col w-full max-h-[85vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-lightdark scrollbar-track-slate-super-dark overflow-x-hidden space-y-3 p-3'
        >
            <SourceBranch/>
            <SourceBranch/>
            <SourceBranch/>
            <SourceBranch/>
     
        </div>
    </div>
  )
}

export default LeftTree