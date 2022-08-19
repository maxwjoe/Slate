import React from 'react'
import ArticleView from '../components/ArticleView';
import Header from '../components/Header';
import LeftTree from '../components/LeftTree';
import ListView from '../components/ListView';

function Dashboard() {
  return (
    <div className='flex flex-col w-full h-full bg-slate-dark'>
      <Header/>
      <div className='flex flex-row grow bg-slate-dark'>
        <LeftTree/>
        <ListView/>
      </div>
    </div>
  )
}

export default Dashboard