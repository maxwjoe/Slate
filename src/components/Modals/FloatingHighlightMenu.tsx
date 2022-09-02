import ReactDom from 'react-dom'
import { getFloatingActionMenuOffset, useClickOutside } from '../../helper/UIHelpers';
import { IHighlightOptions, ITextPosition } from '../../interfaces/FloatingMenuDataInterface'
import { SLATE_TEXT_MAIN, SLATE_SUPER_DARK, SLATE_TEXT_SECONDARY } from '../../services/themeService';
import {IDropDownPackage} from '../../interfaces/DropdownPackageInterface'
import FloatingMenuOption from './FloatingMenuOption';
import { IArticle, IItem, IList } from '../../interfaces/DataInterfaces';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getItemFromListIdAndTitle } from '../../helper/dataHelpers';
import { AiFillDelete } from 'react-icons/ai';
import { RDX_deleteItem } from '../../redux/slices/itemSlice';

interface Props {
    settings : IHighlightOptions;
    closeHandler : any;
}


// FloatingHighlightMenu : Menu that appears when user clicks on already highlighted text
function FloatingHighlightMenu({settings, closeHandler} : Props) {

    // --- Redux State ---
    const curArticle : IArticle = useAppSelector((state) => state.applicationState.selectedArticle) as IArticle;
    
    // --- Redux Hooks ---
    const dispatch = useAppDispatch();

    // --- Custom Hooks ---
    const domNode = useClickOutside(closeHandler);

    // --- Functions ---

    // onRemoveWord : Removes a word from the list
    const onRemoveWord = async (word : IItem) => {
        await dispatch(RDX_deleteItem(word?._id));
        closeHandler();
    }
    
    // --- Constants ---
    const item : IItem = getItemFromListIdAndTitle(curArticle?.associatedList as string, settings?.text) as IItem;
    const offset = {
        ...getFloatingActionMenuOffset(settings?.position as ITextPosition),
        backgroundColor : SLATE_SUPER_DARK,
    };
    const dropdownPackages : IDropDownPackage[] = [
        {Icon : AiFillDelete, ActionTitle : "Remove", ActionFunction : () => onRemoveWord(item)},
    ];


    // Handle the case where there is an invalid item
    if(!item?._id) return null
    
    return ReactDom.createPortal(
    <div ref={domNode} style={offset} className='flex flex-col p-3 absolute w-[180px] h-[180px] bg-[#000] select-none rounded-md'>
        <div style={{color : SLATE_TEXT_MAIN}} className='flex flex-col w-full h-2/3 space-y-3 overflow-scroll scrollbar-thin border-b-2 border-text-secondary'>
            <p  className='text-lg font-bold'>{item.title}</p>
            <div className='flex flex-col overflow-scroll scrollbar-thin'>
                <p className='text-xs'>Definition : </p>
                <p className='text-sm'>{item.definition}</p>
            </div>
        </div>
        <div className='flex flex-col items-center justify-end w-full h-1/3'>
            {dropdownPackages.map((dropdownPackage : IDropDownPackage, index : number) => {
                return (
                    <FloatingMenuOption key={index} DropdownPackage={dropdownPackage}/>
                )
            })}
        </div>
    </div>
  , document.getElementById('portal')!
  )
}

export default FloatingHighlightMenu