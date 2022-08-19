import React from 'react'
import Header from '../components/Header';
import LeftTree from '../components/LeftTree';

function Dashboard() {
  return (
    <div className='flex flex-col w-full h-full bg-slate-dark'>
      <Header/>
      <div className='flex flex-row grow bg-slate-dark'>
        <LeftTree/>
      </div>
    </div>
  )
}

export default Dashboard