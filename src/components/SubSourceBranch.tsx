import React from 'react'
import {BsDot} from 'react-icons/bs'
import {AiFillDelete} from 'react-icons/ai'
import { IArticle } from '../interfaces/DataInterfaces'

interface Props {
  ArticleObj? : IArticle
}


function SubSourceBranch({ArticleObj} : Props) {
  return (
    <div className='flex items-center justify-start w-5/6 h-6 pr-2 hover:bg-slate-lightdark rounded-md'>
        <div className='flex grow justify-start space-x-1 items-center cursor-pointer'>
            <BsDot className='text-text-secondary text-md'/>
            <p className='text-md text-text-secondary select-none'>{ArticleObj?.title}</p>
        </div>
        <AiFillDelete className='text-text-secondary hover:text-text-danger cursor-pointer text-md'/>
    </div>
  )
}

export default SubSourceBranch