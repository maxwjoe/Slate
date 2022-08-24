import React, { useEffect } from 'react'
import SourceBranch from './SourceBranch'
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { ISource } from '../interfaces/DataInterfaces';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { RDX_getSources } from '../redux/slices/sourceSlice';
import { RDX_getArticles } from '../redux/slices/articleSlice';
import { RDX_getLists } from '../redux/slices/listSlice';
import Profile from './Profile';
import Header from './Header';


// LeftTree : Renders the left hand panel of the UI
function LeftTree() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {user} = useAppSelector((state) => state.auth);
  const sourceState = useAppSelector((state) => state.sources)
  const articleState = useAppSelector((state) => state.articles);
  const listState = useAppSelector((state) => state.lists);
  // useEffect to handle auth access and source data pull on load
  useEffect(() => {
    
    if(!user)
    {
      navigate('/login')
      return;
    }
    
    if(sourceState.isError || articleState.isError)
    {
      console.log(sourceState?.sources || articleState?.articles || listState?.lists);
      toast.error(sourceState?.message || articleState?.message || listState?.message);
    }
    console.log("Use Effect Fired Off")
    dispatch(RDX_getSources());
    dispatch(RDX_getArticles());
    dispatch(RDX_getLists());

  }, [user,
     navigate, 
     sourceState.isError, 
     articleState.isError, 
     articleState.message, 
     sourceState.message, 
     dispatch])


  return (
    <div className='flex flex-col justify-between min-w-[215px] bg-slate-super-dark h-[100vh]'>
        <Header/>
        <div 
            style={{scrollbarGutter : 'auto'}}
            className='flex flex-col w-full max-h-[80vh] overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-lightdark scrollbar-track-slate-super-dark space-y-3 p-3'
        >

          {
            sourceState.sources?.length ? 
              sourceState.sources?.map((source : ISource, index : number) => (
                <SourceBranch key = {index} SourceObj = {source}/>
              )) 
              : 
              <>
              <div className='flex w-full h-full justify-center items-center'>
                <p className='text-sm text-text-secondary'>No Sources</p>
              </div>
              </>
          }
       
     
        </div>
        <div className='flex w-full grow justify-end items-end'>
          <div className='flex w-full h-12'>
            <Profile/>
          </div>
        </div>
    </div>
  )
}

export default LeftTree