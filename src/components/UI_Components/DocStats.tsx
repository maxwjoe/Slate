import React from 'react'
import { IStats } from '../../interfaces/StatsInterface';
import ArticleListDisplay from './ArticleListDisplay';

interface Props {
    stats : IStats;
}

// DocStats : Component Responsible for rendering document statistics in RHS of UI
function DocStats({stats} : Props) {
 
  return (
    <div className="flex flex-col max-w-[200px] min-w-[150px] h-full space-y-6">

    <div className="flex w-full flex-col space-y-2">
      
      <div className="flex flex-row justify-between w-full">
        <p className="text-xs text-text-secondary select-none">Created At</p>
        <p className="text-xs text-text-secondary select-none">{stats.createdAt}</p>
      </div>
      <div className="flex flex-row justify-between w-full">
        <p className="text-xs text-text-secondary select-none">Updated At</p>
        <p className="text-xs text-text-secondary select-none">{stats.updatedAt}</p>
      </div>
    </div>

    <div className='w-full'>
      <ArticleListDisplay/>
    </div>

  </div>
  )
}

export default DocStats