import toast from 'react-hot-toast';
import { getAllListsInSource, getListFromListId, } from '../../helper/dataHelpers';
import { IArticle, IList } from '../../interfaces/DataInterfaces';
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

        // Check for Redundant Swap
        if(newListId === curArticle?.associatedList) return null;

        let newListTitle : string = "";
        for(let i = 0 ; i < dropDownOptions.length ; i++)
        {
            if(dropDownOptions[i].real === newListId){
                newListTitle = dropDownOptions[i]?.disp;
                break;
            }
        }

        if(newListTitle === "") return null;

        const updatedArticle : IArticle = {
            ...curArticle,
            associatedList : newListId,
        }

        const updatePromise = dispatch(RDX_updateArticle(updatedArticle))
        
        await toast.promise(updatePromise, {
            loading : `Setting : ${newListTitle}`,
            success : `Now connected to ${newListTitle}`,
            error : "Failed to updated connected list"
        })

        dispatch(setSelectedArticle(updatedArticle))

    }

  return (
    <div className='flex flex-col space-y-3 w-full h-12'>
        <p className='text-text-main text-sm'>Connected List</p>
        <DropdownSelector options={dropDownOptions} defaultSelection = {associatedList?.title} selectionFunction = {changeAssociatedList}/>
    </div>
  )
}

export default ArticleListDisplay