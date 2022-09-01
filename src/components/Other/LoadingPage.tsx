import React from 'react'
import {MrMiyagi} from '@uiball/loaders'


// LoadingPage : Responsible for showing a loading page on login/register
function LoadingPage() {
  return (
    <div className='flex flex-col space-y-5 items-center justify-center w-full h-full bg-slate-dark'>
        <MrMiyagi color='#dee0e4' size={64}/>
        <p className='text-3xl text-bold text-text-main'>Loading</p>
    </div>
  )
}

export default LoadingPage