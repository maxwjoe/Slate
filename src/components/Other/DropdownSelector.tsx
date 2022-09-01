import React, { useState } from 'react'
import {AiOutlineCaretDown} from 'react-icons/ai'
import { useClickOutside } from '../../helper/UIHelpers';
import { IOption } from '../../interfaces/OptionInterface';

interface Props {
    selectionFunction : any;
    defaultSelection? : string;
    options : IOption[];
}

// DropdownSelector : Component responsible for rendering drop down menus (eg. Select a language, select avatar type)
function DropdownSelector({selectionFunction, defaultSelection, options} : Props) {

    console.log("default = ", defaultSelection);

    // --- React State ---
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>(defaultSelection || "Select an Option");
    const domNode = useClickOutside(() => setIsOpen(false));

    // --- Functions ---

    // handleSelect : Handles user selecting an option
    const handleSelect = (op : IOption) => {
        setSelectedOption(op.disp);
        selectionFunction(op.real);
    }

  return (
    <div
        onClick = {() => setIsOpen(!isOpen)} 
        className='flex flex-col relative w-full h-9 bg-slate-lightdark rounded-md text-text-main cursor-pointer'>
        <div className='flex flex-row items-center w-full h-full space-x-2 p-3 z-10 overflow-hidden'>
            <AiOutlineCaretDown className='text-lg'/>
            <p className='whitespace-nowrap max-w-[50%]'>{selectedOption}</p>
        </div>

        {
            isOpen && 
            <div ref = {domNode} className='z-0 flex pt-2 flex-col items-start justify-start absolute top-7 h-32 w-full rounded-b-md bg-slate-lightdark overflow-y-scroll overflow-x-hidden scrollbar-thin'>
                
                {options.map((option : IOption, index : number) => {
                    return (
                        <div key = {index} onClick = {() => handleSelect(option)} className='flex flex-row items-center w-full h-9 space-x-2 p-3 hover:bg-slate-dark whitespace-nowrap'>
                            <p key = {index} className='text-text-main'>{option.disp}</p>
                        </div>
                    )
                })}
            </div>
        }
    </div>
  )
}

export default DropdownSelector