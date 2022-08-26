import React from 'react'
import { AiOutlineCaretRight } from 'react-icons/ai';

interface Props {
    Path : string[];
}

// DocPath : Renders the current document path in the UI
function DocPath({Path} : Props) {
  return (
    <div className="flex w-1/2 h-full items-center space-x-2 justify-start pl-6 overflow-hidden ">
          {Path.map((docItem : string, item : number) => {
            return (
              <div key={item} className="flex items-center space-x-2">
                {(item == Path.length || item == 0) && !!docItem ? null : <AiOutlineCaretRight className="w-3 h-3 text-text-secondary"/>}
                <p className="text-sm text-text-secondary whitespace-nowrap">{docItem}</p>
              </div>
            )
          })}
        </div>
  )
}

export default DocPath