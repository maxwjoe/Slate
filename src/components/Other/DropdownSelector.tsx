import React, { useState } from 'react'
import {AiOutlineCaretDown} from 'react-icons/ai'
import { useClickOutside } from '../../helper/UIHelpers';
import { Option } from '../../interfaces/OptionInterface';

interface Props {
    selectionFunction : any;
    defaultSelection? : string;
    options : Option[];
}


function DropdownSelector({selectionFunction, defaultSelection, options} : Props) {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>(defaultSelection || "Select an Option");
    const domNode = useClickOutside(() => setIsOpen(false));

    // handleSelect : Handles user selecting an option
    const handleSelect = (op : Option) => {
        setSelectedOption(op.disp);
        selectionFunction(op.real);
    }

  return (
    <div
        onClick = {() => setIsOpen(!isOpen)} 
        className='flex flex-col relative w-full h-9 bg-slate-lightdark rounded-md text-text-main cursor-pointer'>
        <div className='flex flex-row items-center w-full h-full space-x-2 p-3 z-10'>
            <AiOutlineCaretDown className='text-lg'/>
            <p>{selectedOption}</p>
        </div>

        {
            isOpen && 
            <div ref = {domNode} className='z-0 flex pt-2 flex-col items-start justify-start absolute top-7 h-24 w-full rounded-b-md bg-slate-lightdark overflow-y-scroll overflow-x-hidden scrollbar-thin'>
                
                {options.map((option : Option, index : number) => {
                    return (
                        <div key = {index} onClick = {() => handleSelect(option)} className='flex flex-row items-center w-full h-9 space-x-2 p-3 hover:bg-slate-dark'>
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