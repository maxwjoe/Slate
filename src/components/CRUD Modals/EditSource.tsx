import React from 'react'
import {ISource} from '../../interfaces/DataInterfaces'

interface Props {
    SourceObj : ISource,
}


// EditSource : UI to go inside the generic modal for editing a source
function EditSource({SourceObj} : Props) {
  return (
    <div className='flex flex-col items-center justify-center w-[50vw] h-[50vh]'>
        <p className='text-text-main'>{SourceObj?.title}</p>
        <p className='text-text-main'>TODO : Implement Editing</p>
    </div>
  )
}

export default EditSource