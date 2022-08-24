import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import ArticleView from '../components/ArticleView';
import Header from '../components/Header';
import LeftTree from '../components/LeftTree';
import ListView from '../components/ListView';
import toast from 'react-hot-toast';
import { RDX_getSources } from '../redux/slices/sourceSlice';

function Dashboard() {

  const navigate = useNavigate();

  const {user} = useAppSelector((state) => state.auth);
  const selectedContentType = useAppSelector((state) => state.applicationState.selectedContentType);

  // useEffect to handle auth access (Locks Dashboard)
  useEffect(() => {
    
    if(!user)
    {
      navigate('/login')
      return;
    }
    console.log("Use Effect Fired Off")

  }, [user, navigate])

  // renderMainView : Renders the main view based on selected content type
  const renderMainView = (selectionType : string) => {
    switch(selectionType)
    {
      case "IArticle":
        return <ArticleView/>
      case "IList":
        return <ListView/>
      default :
      return ( 
        <>
        <div className='flex items-center justify-center bg-slate-lightdark w-full h-full'>
          <p className='text-2xl font-bold text-text-main'>No Content Selected</p>
        </div>
        </>
      )
    }
  }

  return (
    <div className='flex flex-col w-full h-full bg-slate-dark'>
      <div className='flex flex-row grow bg-slate-dark'>
        <LeftTree/>
        {renderMainView(selectedContentType)} 
      </div>
    </div>
  )
}

export default Dashboard