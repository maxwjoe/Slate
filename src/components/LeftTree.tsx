import React, { useEffect } from 'react'
import SourceBranch from './SourceBranch'
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { ISource } from '../interfaces/DataInterfaces';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { RDX_getSources } from '../redux/slices/sourceSlice';


// LeftTree : Renders the left hand panel of the UI
function LeftTree() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {user} = useAppSelector((state) => state.auth);
  const {sources, isLoading, isError, message} = useAppSelector((state) => state.sources);

  //FIXME: Figure out why this happens
  const userSources = sources['sources'] || sources;

  // useEffect to handle auth access and source data pull on load
  useEffect(() => {
    
    if(!user)
    {
      navigate('/login')
      return;
    }
    
    if(isError)
    {
      console.log(sources);
      toast.error(message)
    }
    console.log("Use Effect Fired Off")
    dispatch(RDX_getSources());

  }, [user, navigate, isError,  message, dispatch])


  return (
    <div className='min-w-[215px] bg-slate-super-dark h-full'>
        <div 
            style={{scrollbarGutter : 'auto'}}
            className='flex flex-col w-full min-h-[80vh] max-h-[85vh] overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-lightdark scrollbar-track-slate-super-dark space-y-3 p-3'
        >

          {
            userSources?.length ? 
              userSources?.map((source : ISource, index : number) => (
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
    </div>
  )
}

export default LeftTree