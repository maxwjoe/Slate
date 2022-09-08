import { IArticle } from '../../interfaces/DataInterfaces';
import { IStats } from '../../interfaces/StatsInterface';
import { useAppSelector } from '../../redux/hooks';
import ArticleListDisplay from './ArticleListDisplay';

interface Props {
    stats : IStats;
}

// DocStats : Component Responsible for rendering document statistics in RHS of UI
function DocStats({stats} : Props) {

  // --- Redux State ---
  const curArticle : IArticle = useAppSelector((state) => state.applicationState.selectedArticle) as IArticle;

 
  return (
    <div className="flex flex-col p-3 max-w-[200px] min-w-[180px] h-full space-y-6 select-none">

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
    
    {
      // Only display this feature when content type is the selected article
      !!curArticle && (
        <div className='w-full'>
          <ArticleListDisplay/>
        </div>
      )
    }

  </div>
  )
}

export default DocStats