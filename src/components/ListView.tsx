import React from 'react'
import ItemDefinitionView from './ItemDefinitionView'
import ListItemsView from './ListItemsView'

function ListView() {
  return (
    <div className='flex w-full h-full p-3 space-x-5'>
        <ListItemsView/>
        <ItemDefinitionView/>
    </div>
  )
}

export default ListView